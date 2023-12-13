require('dotenv').config();
const express = require('express');
const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const { v4: uuidv4 } = require('uuid');
const createTables = require('./create_tables');

// Überprüfung der Umgebungsvariablen
const requiredEnvVars = [
    'MQTT_BROKER_URL',
    'MQTT_TEMPERATURE_TOPIC',
    'MQTT_HUMIDITY_TOPIC',
    'MQTT_LOGS_TOPIC'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error(`Fehlende Umgebungsvariablen: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

// Express initialisieren
const app = express();
app.use(express.json());

// DATABASE STUFF:

let db;
async function startDb() {
    try {
        db = await open({
            filename: `./${process.env.DATABASE_FILENAME}.db`,
            driver: sqlite3.Database
        });

        console.log('Verbunden mit der SQLite-Datenbank.');
        createTables(db);
        startAPI();

    } catch (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
    }
}
// MQTT STUFF:
const uuid = uuidv4();
const mqttClientId = `sensorservice_${uuid}`;

const temperatureTopic = process.env.MQTT_TEMPERATURE_TOPIC;
const humidityTopic = process.env.MQTT_HUMIDITY_TOPIC;
const logsTopic = process.env.MQTT_LOGS_TOPIC;

async function startMqtt() {
    const mqttClient = await mqtt.connect(process.env.MQTT_BROKER_URL, { clientId: mqttClientId });

    mqttClient.on('connect', function () {
        mqttClient.subscribe(temperatureTopic, function (err) {
            if (!err) {
                console.log(`Erfolgreich auf Thema "${temperatureTopic}" subscribed`);
            }
        });
        mqttClient.subscribe(humidityTopic, function (err) {
            if (!err) {
                console.log(`Erfolgreich auf Thema "${humidityTopic}" subscribed`);
            }
        });

        const logMessage = `SensorService with Client-ID ${mqttClientId} verbunden. (Fabian)`;
        mqttClient.publish(logsTopic, logMessage);
    });

    mqttClient.on('message', async (topic, message) => {
        if (topic === temperatureTopic) {
            try {
                const data = JSON.parse(message.toString());
    
                // Überprüfe, ob die Werte NULL sind
                if (data.temperature != null && data.mac != null) {
                    try {
                        await db.run('INSERT INTO temperature_data (temperature, mac) VALUES (?, ?)', [data.temperature, data.mac]);
                        // console.log(`Daten gespeichert: ${message.toString()}`);
                    } catch (err) {
                        console.error(`Fehler beim Speichern der Daten: ${err}`);
                    }
                } else {
                    console.log('NULL-Werte erkannt, Datensatz wird ignoriert.');
                }
            } catch (e) {
                console.error(`Fehler beim Parsen der Nachricht: ${e}`);
            }
        }
    });
    
}

async function startAPI() {
    app.get('/temperature-data', async (req, res) => {
        console.log("Endpunkt 'temperature-data' aufgerufen");
        try {
            const rows = await db.all('SELECT * FROM temperature_data ORDER BY timestamp DESC LIMIT 20');
            if (rows.length === 0) {
                console.log('Keine Daten gefunden');
                res.status(404).send({ error: 'Keine Daten gefunden' });
            } else {
                console.log('Daten gefunden:', rows);
                res.status(200).json(rows);
            }
        } catch (err) {
            console.error('Fehler beim Abrufen der Daten:', err);
            res.status(500).send({ error: 'Fehler beim Abrufen der Daten' });
        }
    });

    // Server starten
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server läuft auf Port ${PORT}`);
    });

    startMqtt();
}

startDb();
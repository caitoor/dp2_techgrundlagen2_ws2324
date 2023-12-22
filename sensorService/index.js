require('dotenv').config();
const express = require('express');
const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const { v4: uuidv4 } = require('uuid');
const createTables = require('./create_tables');
const cors = require('cors');
const axios = require('axios');

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
app.use(cors());

// DATABASE STUFF:

let db;
const uuid = uuidv4();
const mqttClientId = `sensorservice_${uuid}`;

const temperatureTopic = process.env.MQTT_TEMPERATURE_TOPIC;
const humidityTopic = process.env.MQTT_HUMIDITY_TOPIC;
const logsTopic = process.env.MQTT_LOGS_TOPIC;

run();

async function run() {
    await startDb();
    await createTables(db);
    await startAPI();
    startMqtt();
}

async function startDb() {
    try {
        db = await open({
            filename: `./${process.env.DATABASE_FILENAME}.db`,
            driver: sqlite3.Database
        });

        console.log('Verbunden mit der SQLite-Datenbank.');

    } catch (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
    }
}

function startMqtt() {
    const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, { clientId: mqttClientId });

    mqttClient.on('connect', function () {
        mqttClient.subscribe(temperatureTopic, function (err) {
            if (!err) {
                console.log(`Erfolgreich auf Thema "${temperatureTopic}" subscribed`);
            }
            else {
                console.error(`Fehler beim Subscriben auf Thema "${temperatureTopic}": ${err}`);
            }
        });

        const logMessage = `SensorService with Client-ID ${mqttClientId} verbunden. (Fabian)`;
        mqttClient.publish(logsTopic, logMessage);
    });

    mqttClient.on('message', async (topic, message) => {
        if (topic === temperatureTopic) {
            // console.log("Nachricht empfangen");
            try {
                const data = JSON.parse(message.toString());
                // Überprüfe, ob die Werte NULL sind
                if (data.temperature != null && data.mac != null) {
                    try {
                        await db.run('INSERT INTO temperature_data (temperature, mac) VALUES (?, ?)', [data.temperature, data.mac]);
                        console.log(`Daten gespeichert: ${message.toString()}`);
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
    app.get('/latest-temperature-data', async (req, res) => {
        console.log("Endpunkt 'temperature-data' aufgerufen");
        const rowCount = req.query.count ? req.query.count : 1;
        try {
            const rows = await db.all(`SELECT * FROM temperature_data ORDER BY timestamp DESC LIMIT ${rowCount}`);
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

    app.post('/add-esp-device', async (req, res) => {
        console.log("Endpunkt 'add-esp-device' aufgerufen");
        const { mac, username } = req.body;

        if (!mac || !username) {
            console.log('MAC-Adresse und Benutzername sind erforderlich');
            return res.status(400).send({ error: 'MAC-Adresse und Benutzername sind erforderlich' });
        }
        else {
            console.log('MAC-Adresse und Benutzername sind vorhanden');
        }

        //überprüfe JWT:
        const authheader = req.headers.authorization;
        const token = authheader && authheader.split(' ')[1];

        try {
            const validationResponse = await axios.get('http://localhost:3001/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log('Token-Validierung erfolgreich');
            console.log(validationResponse.data);
            if (!validationResponse.data.isValid) {
                console.log('Token ist ungültig');
                return res.status(403).send({ error: 'Token ist ungültig' });
            }
            console.log('Token ist gültig');
            const result = await db.run(`INSERT INTO esp_devices (mac, username) VALUES (?, ?)`, [mac, username]);
            console.log('ESP-Gerät hinzugefügt mit ID:', result.lastID);
            res.status(200).send({ message: 'ESP-Gerät erfolgreich hinzugefügt', id: result.lastID });
        } catch (err) {
            console.error('Fehler beim Hinzufügen des ESP-Geräts:', err);
            res.status(500).send('Fehler beim Hinzufügen des ESP-Geräts');
        }
    });


    const PORT = process.env.SENSORSERVICE_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server läuft auf Port ${PORT}`);
    });
}
require('dotenv').config();
const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();
const createTables = require('./create_tables');


// DATABASE STUFF:

let db = new sqlite3.Database(`./${process.env.DATABASE_FILENAME}.db`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Verbunden mit der SQLite-Datenbank.');

    // Lösche alle Einträge beim Start
    db.run('DELETE FROM temperature_data', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Alle vorherigen Einträge gelöscht.');
    });
});

createTables(db);

// MQTT STUFF:
const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL);

mqttClient.on('connect', function () {
    mqttClient.subscribe('dp2/temperature', function (err) {
        if (!err) {
            console.log('Erfolgreich auf Thema "dp2/temperature" subscribed');
        }
    });
    mqttClient.subscribe('dp2/humidity', function (err) {
        if (!err) {
            console.log('Erfolgreich auf Thema "dp2/humidity" subscribed');
        }
    });
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'dp2/temperature') {
        try {
            const data = JSON.parse(message.toString());

            // Überprüfe, ob die Werte NULL sind
            if (data.temperature != null && data.mac != null) {
                const stmt = db.prepare('INSERT INTO temperature_data (temperature, mac) VALUES (?, ?)');
                stmt.run(data.temperature, data.mac);
                stmt.finalize();
                console.log(`Daten gespeichert: ${message.toString()}`);
            } else {
                console.log('NULL-Werte erkannt, Datensatz wird ignoriert.');
            }
        } catch (e) {
            console.error(`Fehler beim Parsen der Nachricht: ${e}`);
        }
    }
});
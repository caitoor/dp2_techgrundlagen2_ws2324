require('dotenv').config();
const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mqtt_data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Verbunden mit der SQLite-Datenbank.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS temperature_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    mac TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

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
            const stmt = db.prepare('INSERT INTO temperature_data (temperature, mac) VALUES (?, ?)');
            stmt.run(data.temperature, data.mac);
            stmt.finalize();
            console.log(`Daten gespeichert: ${message.toString()}`);
        } catch (e) {
            console.error(`Fehler beim Parsen der Nachricht: ${e}`);
        }
    }
});


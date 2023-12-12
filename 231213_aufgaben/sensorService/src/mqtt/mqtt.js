// src/mqtt/mqtt.js

const mqtt = require('mqtt');
const db = require('../database/database');

function startMqttClient() {
    const mqttClientId = `sensorservice_${require('uuid').v4()}`;
    const topic = process.env.MQTT_TOPIC;
    const logsTopic = process.env.MQTT_LOGS_TOPIC;
    const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, { clientId: mqttClientId });

    mqttClient.on('connect', function () {
            mqttClient.subscribe(topic, function (err) {
                if (!err) {
                    console.log(`Erfolgreich auf Thema "${topic}" subscribed`);
                }
            });
        const logMessage = `SensorService with Client-ID ${mqttClientId} verbunden.`;
        mqttClient.publish(logsTopic, logMessage);
    });

    mqttClient.on('error', (error) => {
        console.error('Fehler im MQTT-Client:', error);
    });

    mqttClient.on('offline', () => {
        console.log('MQTT-Client ist offline.');
    });

    mqttClient.on('reconnect', () => {
        console.log('MQTT-Client versucht, sich neu zu verbinden...');
    });

    mqttClient.on('message', async (topic, message) => {
        try {
            const data = JSON.parse(message.toString());
            await db.insertMeasurement(data.type, data.value, data.mac);
            console.log(`Daten gespeichert: ${message.toString()}`);
        } catch (e) {
            console.error(`Fehler beim Parsen oder Speichern der Nachricht: ${e}`);
        }
    });
}

module.exports = { startMqttClient };

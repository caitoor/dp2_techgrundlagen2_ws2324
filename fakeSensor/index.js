require('dotenv').config();
const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');

const mqttBrokerUrl = process.env.MQTT_BROKER_URL;
const topic = process.env.MQTT_TOPIC;
const logsTopic = process.env.MQTT_LOGS_TOPIC;
const interval = parseInt(process.env.INTERVAL);

const clientId = `mqttClient_${uuidv4()}`;
const client = mqtt.connect(mqttBrokerUrl, { clientId });

const randomMac = generateRandomMacAddress();

client.on('connect', () => {
    console.log(`Connected to MQTT Broker with Client ID: ${clientId}`);
    client.publish(logsTopic, `Fake Sensor with Client ID ${clientId} connected`);

    setInterval(() => {
        const message = JSON.stringify({
            temperature: generateRandomTemperature(),
            mac: randomMac,

        });
        client.publish(topic, message);
        console.log(`Message published to ${topic}: ${message}`);
    }, interval);
});

client.on('error', (error) => {
    console.error(`Connection error: ${error}`);
    client.end();
});

function generateRandomTemperature() {
    return Math.random() * 20 + 10;
}

function generateRandomMacAddress() {
    const hexDigits = "0123456789ABCDEF";
    let macAddress = "";
    for (let i = 0; i < 6; i++) {
        macAddress += hexDigits.charAt(Math.floor(Math.random() * 16));
        macAddress += hexDigits.charAt(Math.floor(Math.random() * 16));
        if (i !== 5) {
            macAddress += ":";
        }
    }
    return macAddress;
}

// Example usage:
console.log(generateRandomMacAddress());



process.on('SIGINT', () => {
    console.log('Disconnecting...');
    client.end();
    process.exit();
});

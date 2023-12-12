require('dotenv').config();
const checkEnvVars = require('./src/utils/checkEnvVars');
checkEnvVars();

const db = require('./src/database/database');
db.dbStart();

const mqtt = require('./src/mqtt/mqtt');
mqtt.startMqttClient();
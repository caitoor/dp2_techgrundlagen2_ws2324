function checkEnvVars() {
    const requiredEnvVars = [
        'MQTT_BROKER_URL',
        'MQTT_TOPIC',
        'MQTT_LOGS_TOPIC'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingEnvVars.length > 0) {
        console.error(`Fehlende Umgebungsvariablen: ${missingEnvVars.join(', ')}`);
        process.exit(1);
    }
}

module.exports = checkEnvVars;
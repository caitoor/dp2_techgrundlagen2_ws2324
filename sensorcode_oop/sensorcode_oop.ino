#include "config.h"
#include "src/WiFiConnector.h"
#include "src/MQTTClient.h"
#include <DHT.h>
#include "src/sensors/TemperatureSensor.h"
#include "src/sensors/HumiditySensor.h"
#include "src/Interval.h"
#include "src/DataManager.h"

#define DHTPIN D4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
TemperatureSensor tempSensor(dht);
HumiditySensor humiditySensor(dht);
WiFiConnector wifiConnector;
MQTTClient mqttClient(MQTT_SERVER, MQTT_PORT, MQTT_TOPIC);
DataManager dataManager(mqttClient);
Interval tempInterval(TEMPERATURE_INTERVAL, tempSensor, dataManager);
Interval humidityInterval(HUMIDITY_INTERVAL, humiditySensor, dataManager);

void setup() {
  Serial.begin(115200);
  dht.begin();
  wifiConnector.connect();
  mqttClient.connect();
}

void loop() {
  unsigned long currentMillis = millis();
  mqttClient.loop();
  tempInterval.update(currentMillis);
  humidityInterval.update(currentMillis);
  delay(100);  // relieve cpu a bit
}
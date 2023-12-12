# ESP-Code optimieren

## Code-Erweiterungen

```
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <WiFiManager.h>
#include "config.h"
#include <ArduinoJson.h>

#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastTemperatureMeasure = 0;
unsigned long lastHumidityMeasure = 0;

enum SensorType
{
  TEMPERATURE,
  HUMIDITY
};

void setup()
{
  Serial.begin(115200);
  dht.begin();

  WiFiManager wifiManager;
  // wifiManager.resetSettings();

  if (!wifiManager.autoConnect(WIFIMANAGER_SSID))
  {
    Serial.println("Failed to connect and hit timeout");
    ESP.reset();
    delay(1000);
  }
  Serial.println("Connected to WiFi!");
  Serial.println("Mac Address: " + WiFi.macAddress());

  mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
}


const char *sensorTypeToString(SensorType type)
{
  switch (type)
  {
  case TEMPERATURE:
    return "temperature";
  case HUMIDITY:
    return "humidity";
  default:
    return "unknown";
  }
}

void sendData(float value, SensorType sensorType)
{
  StaticJsonDocument<200> doc;
  doc["value"] = value;
  doc["type"] = sensorTypeToString(sensorType); // Setze den Sensortyp als String
  doc["mac"] = WiFi.macAddress();

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  mqttClient.publish(MQTT_TOPIC, jsonBuffer); // Einheitliches Topic für alle Sensordaten
}

void loop()
{
  if (!mqttClient.connected())
  {
    reconnect();
  }
  mqttClient.loop();

  unsigned long currentMillis = millis();
  
  if (currentMillis - lastHumidityMeasure >= HUMIDITY_INTERVAL)
  {
    lastHumidityMeasure = currentMillis;
    float humidity = dht.readHumidity();
    if (!isnan(humidity))
    {
      sendData(humidity, HUMIDITY);
    }
  }
  if (currentMillis - lastTemperatureMeasure >= TEMPERATURE_INTERVAL)
  {
    lastTemperatureMeasure = currentMillis;
    float temperature = dht.readTemperature();
    if (!isnan(temperature))
    {
      sendData(temperature, TEMPERATURE);
    }
  }
  delay(100); // relieve cpu a bit
}

void reconnect()
{
  if (!mqttClient.connected())
  {

    String clientId = "ESP-" + WiFi.macAddress();
    if (mqttClient.connect(clientId.c_str()))
    {
      Serial.println("MQTT verbunden");
      String logTopic = String(MQTT_TOPIC) + "/logs";
      String logMessage = "ESP connected with Client ID: " + clientId;
      mqttClient.publish(logTopic.c_str(), logMessage.c_str());
    }
    else
    {
      Serial.print("Fehlgeschlagen, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" Versuche es in 5 Sekunden erneut.");
    }
    delay(5000);
  }
}
```

## Schreibe den Arduino-Code in sinnvoller Art und Weise objektorientiert um.

siehe unser GitHub-Repo, hier das Main Script:

```
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
```

Das kann natürlich immer noch verbessert werden:
- Die Interval-Klasse ist womöglich übertrieben, die Funktionalität sollte vermutlich lieber Teil der Sensorklasse sein.
- Die Querverbindung zwischen Interval und DataManager könnte durch eine Funktion zur Erstellung von Callback-Funktionen beseitigt werden. Dadurch wird der Code modularer und besser wiederverwendbar.
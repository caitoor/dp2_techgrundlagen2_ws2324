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

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFiManager wifiManager;
  // wifiManager.resetSettings();

  if (!wifiManager.autoConnect(WIFIMANAGER_SSID)) {
    Serial.println("Failed to connect and hit timeout");
    ESP.reset();
    delay(1000);
  }
  Serial.println("Connected to WiFi!");
  Serial.println("Mac Address: " + WiFi.macAddress());

  mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
}

void loop() {
  while (!mqttClient.connected()) {
    Serial.println("Attempting MQTT connection...");
    reconnect();
  }
  mqttClient.loop();

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (!isnan(humidity) && !isnan(temperature)) {
    sendTemperature(temperature);
    sendHumidity(humidity);
  }
  delay(2000);
}

void reconnect() {
  if (!mqttClient.connected()) {

    String clientId = "ESP-" + WiFi.macAddress();
    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("MQTT verbunden");
    } else {
      Serial.print("Fehlgeschlagen, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" Versuche es in 5 Sekunden erneut.");
    }
    delay(5000);
  }
}

void sendTemperature(float temperature) {
  StaticJsonDocument<200> doc;  // Adjust size according to your needs
  doc["temperature"] = temperature;
  doc["mac"] = WiFi.macAddress();

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);  // Serialize JSON data to a buffer

  mqttClient.publish(MQTT_TOPIC_TEMPERATURE, jsonBuffer);  // Replace with your actual topic
}

void sendHumidity(float humidity) {
  StaticJsonDocument<200> doc;  // Adjust size according to your needs
  doc["humidity"] = humidity;
  doc["mac"] = WiFi.macAddress();

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);  // Serialize JSON data to a buffer

  mqttClient.publish(MQTT_TOPIC_HUMIDITY, jsonBuffer);  // Replace with your actual topic
}
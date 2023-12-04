#include "DataManager.h"

DataManager::DataManager(MQTTClient& mqttClient)
  : _mqttClient(mqttClient) {}

void DataManager::processData(float value, const char* sensorType) {
  StaticJsonDocument<200> doc;
  doc["value"] = value;
  doc["type"] = sensorType;
  doc["mac"] = WiFi.macAddress();

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  _mqttClient.publish(jsonBuffer);
}

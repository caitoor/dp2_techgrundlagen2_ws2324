#ifndef DataManager_h
#define DataManager_h

#include <ArduinoJson.h>
#include "MQTTClient.h"

class DataManager {
public:
  DataManager(MQTTClient& mqttClient);
  void processData(float value, const char* sensorType);

private:
  MQTTClient& _mqttClient;
};

#endif

#include "HumiditySensor.h"
#include <DHT.h>

HumiditySensor::HumiditySensor(DHT& sensor)
  : _sensor(sensor) {}

float HumiditySensor::readValue() {
  return _sensor.readHumidity();
}

const char* HumiditySensor::getType() {
  return "humidity";
}

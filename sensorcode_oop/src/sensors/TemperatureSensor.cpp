#include "TemperatureSensor.h"
#include <DHT.h>

TemperatureSensor::TemperatureSensor(DHT& sensor)
  : _sensor(sensor) {}

float TemperatureSensor::readValue() {
  return _sensor.readTemperature();
}

const char* TemperatureSensor::getType() {
  return "temperature";
}

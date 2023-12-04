#include "Interval.h"

Interval::Interval(unsigned long interval, Sensor& sensor, DataManager& dataManager)
  : _interval(interval), _sensor(sensor), _dataManager(dataManager), _lastMeasure(0) {}

void Interval::update(unsigned long currentMillis) {
  if (currentMillis - _lastMeasure >= _interval) {
    _lastMeasure = currentMillis;
    float value = _sensor.readValue();
    _dataManager.processData(value, _sensor.getType());
  }
}

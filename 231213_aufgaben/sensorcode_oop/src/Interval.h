#ifndef Interval_h
#define Interval_h

#include "sensors/Sensor.h"
#include "DataManager.h"

class Interval {
public:
  Interval(unsigned long interval, Sensor& sensor, DataManager& dataManager);
  void update(unsigned long currentMillis);

private:
  unsigned long _interval;
  unsigned long _lastMeasure;
  Sensor& _sensor;
  DataManager& _dataManager;
};

#endif

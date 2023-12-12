#ifndef TemperatureSensor_h
#define TemperatureSensor_h

#include <DHT.h>
#include "Sensor.h"

class TemperatureSensor : public Sensor {
public:
  TemperatureSensor(DHT& sensor);
  virtual float readValue() override;
  const char* getType() override;
private:
  DHT& _sensor;
};

#endif

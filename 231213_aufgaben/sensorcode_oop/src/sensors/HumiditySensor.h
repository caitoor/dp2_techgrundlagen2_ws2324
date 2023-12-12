#ifndef HumiditySensor_h
#define HumiditySensor_h

#include <DHT.h>
#include "Sensor.h"

class HumiditySensor : public Sensor {
public:
  HumiditySensor(DHT& sensor);
  virtual float readValue() override;
  const char* getType() override;
private:
  DHT& _sensor;
};

#endif

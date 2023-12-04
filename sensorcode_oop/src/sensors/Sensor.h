#ifndef Sensor_h
#define Sensor_h

class Sensor {
public:
  virtual ~Sensor() {}

  // Reine virtuelle Funktion zum Auslesen des Sensorwertes
  virtual float readValue() = 0;

  // Reine virtuelle Funktion zur Rückgabe des Sensortyps als String
  virtual const char* getType() = 0;
};

#endif

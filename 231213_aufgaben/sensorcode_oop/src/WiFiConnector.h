#ifndef WiFiConnector_h
#define WiFiConnector_h

#include <ESP8266WiFi.h>
#include <WiFiManager.h>

class WiFiConnector {
public:
  WiFiConnector();
  void connect();

private:
  WiFiManager wifiManager;
};

#endif

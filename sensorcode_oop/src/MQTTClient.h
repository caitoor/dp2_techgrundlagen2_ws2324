#ifndef MQTTClient_h
#define MQTTClient_h

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

class MQTTClient {
public:
  MQTTClient(const char* server, int port, const char* rootTopic);
  void connect();
  void loop();
  void publish(const char* message, const char* subTopic = "");

private:
  WiFiClient _espClient;
  PubSubClient _client;
  const char* _server;
  int _port;
  String _rootTopic;
  void reconnect();
};

#endif

#include "MQTTClient.h"
#include <ESP8266WiFi.h>

MQTTClient::MQTTClient(const char* server, int port, const char* rootTopic)
  : _client(_espClient), _server(server), _port(port), _rootTopic(rootTopic) {
  _client.setServer(_server, _port);
}

void MQTTClient::connect() {
  reconnect();
}

void MQTTClient::loop() {
  if (!_client.connected()) {
    reconnect();
  }
  _client.loop();
}

void MQTTClient::publish(const char* message, const char* subTopic) {
  String fullTopic = _rootTopic;
  if (subTopic && subTopic[0] != '\0') {
    fullTopic += "/";
    fullTopic += subTopic;
  }
  _client.publish(fullTopic.c_str(), message);
}

void MQTTClient::reconnect() {
  while (!_client.connected()) {
    String clientId = "ESP-" + WiFi.macAddress();
    if (_client.connect(clientId.c_str())) {
      Serial.println("MQTT verbunden");
      String logMessage = "ESP connected with Client ID: " + clientId;
      publish(logMessage.c_str(), "logs");
    } else {
      Serial.print("Fehlgeschlagen, rc=");
      Serial.print(_client.state());
      Serial.println(" Versuche es in 5 Sekunden erneut.");
      delay(5000);
    }
  }
}

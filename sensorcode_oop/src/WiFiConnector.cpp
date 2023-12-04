#include "WiFiConnector.h"

WiFiConnector::WiFiConnector() {
  // Konstruktor
}

void WiFiConnector::connect() {
  // Versuche, eine Verbindung mit gespeicherten Einstellungen herzustellen
  if (!wifiManager.autoConnect()) {
    Serial.println("Failed to connect and hit timeout");
    ESP.reset();
    delay(1000);
  }

  // Nach erfolgreicher Verbindung:
  Serial.println("Connected to WiFi!");
  Serial.println("Mac Address: " + WiFi.macAddress());
}

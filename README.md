# dp2_techgrundlagen2_ws2324

## Aufgaben (gestellt am 30.11.2023)

1. Finde dann für jede Entität weitere mögliche Attribute. Um welche herauszufinden, kannst du dir überlegen, welche Features in Zukunft möglich sein sollten.
1. Zeichne dann ein ER-Diagramm des Datenmodells mit allen
    - Entitäten und Attributen
    - Beziehungen (Verben)
    - Kardinalitäten
1. Füge allen Entitäten in eurem Datenmodell das Attribut „createdAt“ (Timestamp der Erstellung der Zeile) und „modifiedAt“ (Timestamp der letzten Änderung einer Zeile) hinzu – aber natürlich jeweils nur da, wo es auch Sinn macht.
1. Überlegt euch die möglichen Implikationen dieses Vorgehens für unsere bisherigen Zuordnungstabellen.
1. Wenn du davon nicht genug bekommen kannst, ändere das ERD des Klassenbeispiels so ab, dass es zusätzlich noch Fächer gibt. Diese Übung ist rein optional.
1. Erzeuge in der create_tables.js all diese Tabellen entsprechend.
1. Kümmere dich in dem Zuge gleich noch darum, dass wenn ihr die mqtt_data.db löscht und dann das node Script startet, der Fehler „SQLITE_ERROR: no such table: temperature_data“ nicht auftritt. Finde heraus, warum dieser Fehler überhaupt entsteht.
1. Überprüfe, wie und wo die Sensordaten am sinnvollsten für das entwickelte Datenmodell geschickt werden müssen (JSON-Struktur / Wie viele bzw. welche Topics?) und ändere den Code auf dem ESP entsprechend.
1. Kompliziert wird dabei folgende Sache: Woher wisst ihr die ID der Sensoren? Vermutlich müsst ihr zu Beginn einmal Sensoren in eurer Datenbank registrieren, und zwar manuell, hard-coded. Ihr bekommt dann bei eintreffenden Nachrichten über das ESP und evtl. ein gewähltes Topic (oder anders) heraus, welcher Sensor gemeint sein muss und könnt die SensorID für euren eintreffenenden Sensorwert verwenden.  
Eine andere Lösung wäre natürlich, die Entität „Sensor“ wieder zu löschen (schweren Herzens) und dem Measurement das Attribut „type“ zu geben. Das ist der viel komfortablere Weg, das müsst ihr abwägen, was ihr wollt.  
Ändere schließlich auch den Code des Node Scripts entsprechend, dass die neu eintreffenden Werte korrekt in die neu angelegten Tabellen abgespeichert werden.
1. **ADVANCED**: Wenn nun Sensorwerte empfangen wird, wird bislang die Mac-Adresse gespeichert. Wir wollen aber die ESP_ID als Foreign Key abspeichern. Frage also bei einem eintreffenden Wert ab, obsich die Mac-Adresse bereits in der ESP-Tabelle befindet. Wenn ja, gib die ID zurück. Wenn nein, lege den ESP in der ESP-Tabelle an und gib auch die neue ID zurück. 
1. **VERY ADVANCED**: Wenn es dabei zu Problemen kommt (insbesondere wenn ihr Temperatur- und Feuchtigkeitswerte gleichzeitig schickt), überlegt euch was mit dem Begriff „Race Conditions“ gemeint sein könnte und behebt das!

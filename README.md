# dp2_techgrundlagen2_ws2324

[[docs/datamodel.md | Zum Basis-Datenmodell aus dem Unterricht]]

## Aufgaben (gestellt am 30.11.2023)


1. Finde für jede Entität weitere mögliche Attribute. Um passende herauszufinden, kannst du dir überlegen, welche Features in Zukunft implementiert werden könnten / sollten.
1. Zeichne dann ein Entity Relationship Diagramm (ERD) des Datenmodells mit allen
    - Entitäten und Attributen
    - Beziehungen (Verben)
    - Kardinalitäten
1. Füge allen Entitäten in diesem Datenmodell das Attribut `createdAt` (Timestamp der Erstellung der Zeile) und `modifiedAt` (Timestamp der letzten Änderung einer Zeile) hinzu – aber natürlich jeweils nur da, wo es auch Sinn macht.
1. Überlegt euch die möglichen Implikationen dieses Vorgehens für unsere bisherigen Zuordnungstabellen.
1. Kompliziert wird vermutlich die Entität `Sensor`. Wie erhaltet ihr die ID eines Sensors? Der DHT11 hat keine einzigartige Hardware-ID, die man auslesen kann. Überlegt euch: Ist es wünschenswert, dass man Sensoren zwischen den ESPs tauschen kann? Ist es wichtig, die einzelnen Sensoren zu unterscheiden? Wie sieht es mit hostorischen Daten aus, die vermutlich eher Raum- als Sensor-bezogen dargestellt werden sollen? Wäge ab und begründe, in welchem Fall eine Entität Sensor Sinn macht – und in welchen Fällen nicht. Passe das Datenmodell auf Basis dieser Entscheidung womöglich an.
1. Passe das Datenmodell und das ERD für alle gemachten Änderungen an: Attribute (zusätzliche / optionale / gelöschte), Zeitstempel, hinzugefügte oder gelöschte Entitäten und Zuordnungstabellen, Kardinalitäten und Beziehungen. Mache davor eine Kopie des alten Standes).
1. Überprüfe, wie und wo die Sensordaten am sinnvollsten für das entwickelte Datenmodell geschickt werden müssen (JSON-Struktur / Wie viele bzw. welche Topics?) und ändere den Code auf dem ESP entsprechend.
1. Wenn du von dem ganzen Data Modelling nicht genug bekommen kannst, ändere das ERD des Schul-Beispiels aus dem Unterricht so ab, dass es zusätzlich die Entität `Fach` gibt. Außerdem sollen erine unbestimmte Zahl an Zusatzämtern (Medienwart, Strahlenschutzbeauftragter, etc.) für jeden Jahren gespeichert werden, sodass auch auf historische Daten für diese Ämter zugänglich sind – also z. B. die Frage: "In welchem Jahr war welcher Lehrer Medienwart?". Diese Übung ist rein optional, kann also übersprungen werden (gibt dann aber keinen Punkt).
1. Erzeuge in der `create_tables.js` alle für dein Datenmodell relevanten Tabellen nun entsprechend.
1. Kümmere dich in dem Zuge gleich noch darum, dass wenn ihr die `mqtt_data.db` löscht und dann das node Script startet, der Fehler `SQLITE_ERROR: no such table: temperature_data` nicht auftritt. Finde heraus, warum dieser Fehler überhaupt entsteht.
1. Ändere auch den Code des Node Scripts, dass die neu eintreffenden Werte korrekt in die neu angelegten Tabellen abgespeichert werden.
1. **ADVANCED**: Wenn nun Sensorwerte empfangen werden, werden bislang die Mac-Adressen des sendenden ESPs gespeichert. Wir wollen aber die `Esp_id` als Foreign Key abspeichern. Frage also bei einem eintreffenden Wert ab, ob sich die `mac_address` bereits in der ESP-Tabelle befindet. Wenn ja, gib die ID zurück. Wenn nein, lege den ESP in der ESP-Tabelle an und gib auch die neue ID zurück. Wenn du es für sinnvoll hältst,  kannst du diese Aufgabe auch etwas leichter lösen, indem du im Datenmodell die Mac-Adresse eines ESP als Primary Key festlegst und keine ID vergibst. Passe dann aber auch den Rest entsprechend an.
1. **VERY ADVANCED**: Wenn es bei der Speicherung von neuen ESPs zu Problemen kommt (insbesondere wenn du Temperatur- und Feuchtigkeitswerte gleichzeitig schickst), überlege dir, was mit dem Begriff „Race Conditions“ gemeint sein könnte und behebe das!

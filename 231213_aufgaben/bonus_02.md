# Stelle sicher, dass dein Datenmodell es zulässt, dass User jederzeit einsehen können, welche Arten von Sensoren am ESP angeschlossen sind. Es ist jedoch nicht wichtig, dass gleiche Sensortypen untereinander unterschieden werden können.

- Ein ESP kann mehrere Sensoren angeschlossen haben.
- Ein bestimmter Sensor kann gleichzeitig nur an einem ESP angeschlossen sein

Für die Verwendung der Entität Sensor besteht also eine 1:n-Beziehung. Dazu müssen wir aber die jeweiligen Sensoren auch eindeutig identifizieren können. Das können wir durch das Fehlen einer Hardware-ID o. Ä. nicht.

Wir speichern deswegen nur Sensortypen wie z. B. "temperature" oder "humidity" ab. Und für die gilt:

- Ein ESP kann mehrere verschiedene Sensortypen angeschlossen haben.
- Ein Sensortyp kann gleichzeitig bei vielen verschiedenen ESPs verbaut sein.

Es besteht also eine n:m -Beziehung. Daher brauchen wir eine zusätzliche Zuordnungstabelle (wie bereits in Aufgabe 6 genutzt):

<table>
  <tr>
    <th colspan="3">EspsSensortypes</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
   <tr>
    <td>esp_id</td>
<td>INT</td>
    <td>FOREIGN KEY (Esps)</td>
  </tr>
  <tr>
    <td>sensortype</td>
    <td>VARCHAR</td>
    <td>FOREIGN KEY (Sensortypes)</td>
  </tr>
     <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
       <tr>
    <td>deleted_at</td>
    <td>DATETIME</td>
    <td>OPTIONAL</td>
  </tr>
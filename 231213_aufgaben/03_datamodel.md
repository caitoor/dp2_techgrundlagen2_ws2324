[[../../README.md | < Zur Übersicht]]

## Füge allen Entitäten in diesem Datenmodell das Attribut `created_at` (Timestamp der Erstellung der Zeile) und `modified_at` (Timestamp der letzten Änderung einer Zeile) hinzu – aber natürlich jeweils nur da, wo es auch Sinn macht.

<table>
  <tr>
    <th colspan="3">Esp</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
   <tr>
    <td>mac_address</td>
    <td>STRING</td>
    <td>UNIQUE</td>
  </tr>
   <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>modified_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>owner_id</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
</table>


<table>
  <tr>
    <th colspan="3">Sensor</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
   <tr>
    <td>type</td>
    <td>STRING</td>
    <td>NOT NULL</td>
  </tr>
   <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
  <tr>
    <td>modified_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>esp_id</td>
    <td></td>
    <td>FOREIGN KEY (Esp)</td>
  </tr>
</table>
* Wenn unterschieden werden soll, wann jeder einzelne Sensor zuletzt an ein anderes ESP gesteckt wurde. Prinzipiell könnte man hier vermutlich sogar beide Timestamps weglassen.

<table>
  <tr>
    <th colspan="3">Measurement</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
     <tr>
    <td>value</td>
    <td>REAL</td>
    <td></td>
  </tr>
   <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>sensor_id</td>
    <td></td>
    <td>FOREIGN KEY (Sensor)</td>
  </tr>
</table>
* Kein modified_at, da kein Attribut jemals manuell geändert werden wird.

<table>
  <tr>
    <th colspan="3">User</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
  <tr>
    <td>name</td>
    <td>STRING</td>
    <td>UNIQUE</td>
  </tr>
   <tr>
    <td>password</td>
    <td>STRING</td>
    <td></td>
  </tr>
     <tr>
    <td>email</td>
    <td>STRING</td>
    <td>UNIQUE</td>
  </tr>
     <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>modified_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">Group</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
  <tr>
    <td>name</td>
    <td>STRING</td>
    <td></td>
  </tr>
     <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>modified_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>founder_id</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
</table>
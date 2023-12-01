[[../README.md | < Zur Übersicht]]

Stand 30.11.2023
# Entitites
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
    <td>creation_date</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>owner</td>
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
    <td></td>
  </tr>
   <tr>
    <td>createdAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
  <tr>
    <td>modifiedAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>esp_id</td>
    <td></td>
    <td>FOREIGN KEY (Esp)</td>
  </tr>
</table>

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
    <td>createdAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>sensor_id</td>
    <td></td>
    <td>FOREIGN KEY (Sensor)</td>
  </tr>
</table>

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
    <td>createdAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>modifiedAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">Gruppe</th>
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
    <td>createdAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>modifiedAt</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
     <tr>
    <td>founder</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
</table>

# Mapping tables

<table>
  <tr>
    <th colspan="3">GruppeUser</th>
  </tr>
  <tr>
    <td>gruppe_id (FK)</td>
    <td>user_id (FK)</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">GruppeEsp</th>
  </tr>
  <tr>
    <td>gruppe_id (FK)</td>
    <td>esp_id (FK)</td>
  </tr>
</table>
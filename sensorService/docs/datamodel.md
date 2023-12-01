[[../README.md | < Zur Übersicht]]

Stand 30.11.2023
# Entitäten
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
    <td>founder</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
</table>

# Zuordnungstabellen

<table>
  <tr>
    <th colspan="3">GroupUser</th>
  </tr>
  <tr>
    <td>group_id (FK)</td>
    <td>user_id (FK)</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">groupEsp</th>
  </tr>
  <tr>
    <td>group_id (FK)</td>
    <td>esp_id (FK)</td>
  </tr>
</table>
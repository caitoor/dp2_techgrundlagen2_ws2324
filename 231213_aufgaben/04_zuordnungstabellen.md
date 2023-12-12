[[../../README.md | < Zur Übersicht]]

## Überlege dir die möglichen Implikationen dieses Vorgehens für unsere bisherigen Zuordnungstabellen.

Wir speichern nun Informationen über den Zeitpunkt ab, wann welche User, ESPs und Gruppen einander zugeordnet werden oder diese Zuordnungen verändert werden. Die Zuordnungstabellen werden dadurch zu regulären Tabellen, da nun auch weitere Attribute zu ebenjenen Zuordnungen erhoben werden. Diese Zuordnungen werden dadurch zur Entität.

<table>
  <tr>
    <th colspan="3">GroupUser</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
   <tr>
    <td>group_id</td>
<td></td>
    <td>FOREIGN KEY (Group)</td>
  </tr>
  <tr>
    <td>user_id</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
     <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="3">GroupEsp</th>
  </tr>
  <tr>
    <td>id</td>
    <td>INT</td>
    <td>PRIMARY KEY AUTOINCREMENT</td>
  </tr>
   <tr>
    <td>group_id</td>
<td></td>
    <td>FOREIGN KEY (Group)</td>
  </tr>
  <tr>
    <td>esp_id</td>
    <td></td>
    <td>FOREIGN KEY (User)</td>
  </tr>
     <tr>
    <td>created_at</td>
    <td>DATETIME</td>
    <td>DEFAULT TIMESTAMP</td>
  </tr>
</table>

Da es keine weiteren Informationen zu diesen Zuordnungen gibt, die sich in Zukunft ändern könnten, brauchen wir kein Modifikationsdatum.

Wenn zudem gespeichert werden soll, wann eine Gruppe verlassen oder ein ESP aus einer Gruppe entfernt wird, könnte man jeweils das Attribut `deleted_at` hinzufügen ("Soft Delete").
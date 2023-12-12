require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const tables = require('./tables');
const { setSensortypes } = require('./setSensortypes');
const dbPath = path.join(__dirname, process.env.DB_FILENAME);

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

async function createTables(db) {
  for (const table of tables) {
    await db.exec(table.sql);
    console.log(`Tabelle ${table.name} erstellt oder bereits vorhanden.`);
  }
}

async function insertMeasurement(type, value, mac) {
  console.log(`Füge Messung hinzu: ${type}, ${value}, ${mac}`);
  const db = await openDb();

  const sensorTypeExists = await checkSensortype(type);
  if (!sensorTypeExists) {
    console.error(`Ungültiger Sensortyp: ${type}`);
    await db.close();
    return;
  }

  let esp = await db.get(`SELECT id FROM Esps WHERE mac_address = ?`, [mac]);

  // Wenn kein ESP gefunden wird, füge ein neues hinzu
  if (!esp) {
    const newEspId = await insertEsp(mac);
    esp = { id: newEspId };
  }
  try {
    await db.run(`INSERT INTO Measurements (sensor_type, value, esp_id) VALUES (?, ?, ?)`, [type, value, esp.id]);
  } catch (error) {
    console.error(`Fehler beim Einfügen der Messung: ${error}`);
  }
  await db.run(`INSERT INTO Measurements (sensor_type, value, esp_id) VALUES (?, ?, ?)`, [type, value, esp.id]);
  await db.close();
}

async function insertEsp(mac) {
  const db = await openDb();
  const result = await db.run(`INSERT INTO Esps (mac_address, name) VALUES (?, ?)`, [mac, mac]);
  console.log(`Neuer ESP mit ID ${result.lastID} hinzugefügt.`);
  //TODO: add owner_id
  await db.close();
  return result.lastID;
}

async function checkSensortype(type) {
  const db = await openDb();
  const sensortype = await db.get(`SELECT type FROM Sensortypes WHERE type = ?`, [type]);
  await db.close();
  return sensortype;
}

async function clearAllTables() {
  const db = await openDb();
  try {
    for (const table of tables) {
      await db.run(`DELETE FROM ${table.name}`);
      console.log(`Alle Einträge aus Tabelle ${table.name} gelöscht.`);
    }
  } catch (error) {
    console.error('Fehler beim Löschen der Tabelleneinträge:', error);
  } finally {
    await db.close();
  }
}

async function dbStart() {
  let db;
  try {
    const dbExists = fs.existsSync(dbPath);
    db = await openDb();
    if (!dbExists) {
      // Wenn die DB-Datei nicht existiert, erstelle die Tabellen
      console.log('Datenbankdatei existiert nicht. Erstelle Tabellen...');
      await createTables(db);
    } else if (process.env.CLEAR_TABLES_ON_START === 'true') {
      // Wenn die DB-Datei existiert und die Umgebungsvariable gesetzt ist, leere die Tabellen
      console.log('Leere alle Tabellen...');
      await clearAllTables(db);
    }
    await setSensortypes(db);
  } catch (error) {
    console.error('Ein Fehler ist aufgetreten:', error);
  } finally {
    if (db) {
      await db.close();
    }
  }
}

module.exports = {
  insertMeasurement,
  insertEsp,
  dbStart
};
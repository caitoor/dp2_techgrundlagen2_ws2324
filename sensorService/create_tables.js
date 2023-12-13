// Funktion zum Erstellen der Tabellen
async function createTables(db) {
  try {
    await db.run(`CREATE TABLE IF NOT EXISTS temperature_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      temperature REAL,
      mac TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Tabellen erfolgreich erstellt oder bereits vorhanden.');
  } catch (err) {
    console.error('Fehler beim Erstellen der Tabellen:', err);
  }
}

// Export der Funktion
module.exports = createTables;

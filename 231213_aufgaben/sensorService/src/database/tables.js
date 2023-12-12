const tables = [
  {
    name: 'Users',
    sql: `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        email VARCHAR UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login_at DATETIME DEFAULT NULL
      )`
  },
  {
    name: 'Groups',
    sql: `CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        description VARCHAR,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        founder_id INTEGER,
        admin_id INTEGER,
        FOREIGN KEY (founder_id) REFERENCES Users(id),
        FOREIGN KEY (admin_id) REFERENCES Users(id)
      )`
  },
  {
    name: 'Esps',
    sql: `CREATE TABLE IF NOT EXISTS Esps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mac_address VARCHAR UNIQUE,
        name VARCHAR,
        description VARCHAR,
        running BOOLEAN NOT NULL DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        owner_id INTEGER,
        FOREIGN KEY (owner_id) REFERENCES Users(id)
      )`
  },
  {
    name: 'Measurements',
    sql: `CREATE TABLE IF NOT EXISTS Measurements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        sensor_type VARCHAR,
        esp_id INTEGER,
        FOREIGN KEY (sensor_type) REFERENCES Sensortypes(type),
        FOREIGN KEY (esp_id) REFERENCES Esps(id)
      )`
  },
  {
    name: 'Sensortypes',
    sql: `CREATE TABLE IF NOT EXISTS Sensortypes (
        type VARCHAR PRIMARY KEY
      )`
  },
  {
    name: 'GroupsUsers',
    sql: `CREATE TABLE IF NOT EXISTS GroupsUsers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER,
        user_id INTEGER,
        inviting_user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME DEFAULT NULL,
        FOREIGN KEY (group_id) REFERENCES Groups(id),
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (inviting_user_id) REFERENCES Users(id)
      )`
  },
  {
    name: 'GroupsEsps',
    sql: `CREATE TABLE IF NOT EXISTS GroupsEsps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id INTEGER,
        esp_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME DEFAULT NULL,
        FOREIGN KEY (group_id) REFERENCES Groups(id),
        FOREIGN KEY (esp_id) REFERENCES Esps(id)
      )`
  },
  {
    name: 'EspsSensortypes',
    sql: `CREATE TABLE IF NOT EXISTS EspsSensortypes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        esp_id INTEGER,
        sensortype_id VARCHAR,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (esp_id) REFERENCES Esps(id),
        FOREIGN KEY (sensortype_id) REFERENCES Sensortypes(type)
      )`
  },
];

module.exports = tables;
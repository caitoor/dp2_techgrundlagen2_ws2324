async function setSensortypes(db) {
    const types = [
        'temperature',
        'humidity'
    ];

    // TODO: check if array and table content is identically -> do nothing
    // be aware: you might have to delete some entries in the table

    for (const type of types) {
        // console.log(`Checking if sensortype ${type} exists...`);
        const exists = await db.get(`SELECT type FROM Sensortypes WHERE type = ?`, [type]);
        if (!exists) {
            console.log(`Sensortype ${type} does not exist. Creating it...`);
            try {
                await db.run(`INSERT INTO Sensortypes (type) VALUES (?)`, [type]);
            } catch (error) {
                console.error(`Fehler beim Einfügen des Sensortyps ${type}:`, error);
            }
        }
        else {
            // console.log(`Sensortype ${type} already exists. Skipping...`);
        }
    }
}

module.exports = { setSensortypes };
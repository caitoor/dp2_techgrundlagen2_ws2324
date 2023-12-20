require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`;
const mongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Verbinden mit der Datenbank
async function connectToDatabase() {
    await mongoClient.connect();
    return mongoClient.db("userDB").collection("users");
}

// Endpunkt für die Registrierung
app.post('/register', async (req, res) => {
    const users = await connectToDatabase();

    const userData = {
        username: req.body.username,
        password: req.body.password
    };

    const existingUser = await users.findOne({ username: userData.username });
    if (existingUser) {
        console.log(`Benutzer ${userData.username} existiert bereits`);
        return res.status(400).send('Benutzer existiert bereits');
    }

    await users.insertOne(userData);
    res.status(201).send('Benutzer erfolgreich registriert');
    console.log(`Benutzer ${userData.username} wurde registriert`);
});

// Endpunkt für Login
app.post('/login', async (req, res) => {
    const users = await connectToDatabase();
    const { username, password } = req.body;

    const user = await users.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(401).send('Ungültige Anmeldedaten');
    }

    res.status(200).send('Erfolgreich angemeldet');
});

// Endpunkt für Logout
app.post('/logout', (req, res) => {
    res.status(200).send('Erfolgreich abgemeldet');
});

const PORT = process.env.USERSERVICE_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

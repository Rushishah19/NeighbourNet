// database.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client.db("NeighborNet"); // Change "MyDatabase" to the database name you want
}

module.exports = connectToDatabase;

// database.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const connectToDatabase = async () => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log("Connected to MongoDB Atlas!");
      return client.db("Cluster0");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  };
  

module.exports = connectToDatabase;


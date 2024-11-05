const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const connectToDatabase = require('./database'); // Ensure this connects to your MongoDB

const app = express();
app.use(express.json()); // To handle JSON data

// Add user to database
app.post('/add-user', async (req, res) => {
    const { name, email, phone, password, type } = req.body; // Get fields from the request body

    try {
        const db = await connectToDatabase();
        
        // Check if email already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Add new user
        const result = await db.collection('users').insertOne({ 
            name, 
            email, 
            phone, 
            password, // In production, always hash the password
            type 
        });

        res.status(201).json({ message: 'User added', userId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding user' });
    }
});

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Delete a user by ID
app.delete('/delete-user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const db = await connectToDatabase();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
        
        if (result.deletedCount === 1) {
            res.status(200).json({ message: `User with ID ${userId} deleted.` });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Check if email is already registered (for frontend validation)
app.get('/is-email-registered', async (req, res) => {
    const { email } = req.query;

    try {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne({ email });
        res.status(200).json({ isRegistered: !!user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking email' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

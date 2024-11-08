import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 5173;

// Enable more detailed logging
mongoose.set('debug', true);

app.use(cors());
app.use(express.json());

app.post('/api/signup', (req, res) => {
  // Your signup handling logic here
  res.status(200).json({ message: "User created successfully" });
});

// MongoDB Atlas connection with more detailed error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
    console.log('Database name:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('MongoDB connection error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    process.exit(1);
  });

// Connection error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(signupUser);
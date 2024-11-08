const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Parse JSON bodies
app.use(bodyParser.json());

// Mock user database
let users = [];

// app.post('/api/signup', (req, res) => {
//   const { email, name, phone, password, type } = req.body;

//   // Simple validation
//   if (!email || !name || !phone || !password || !type) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Create new user (mock database insert)
//   const newUser = { id: Date.now(), email, name, phone, password, type };
//   users.push(newUser);

//   return res.status(201).json({ message: 'User created', user: newUser });
// });
app.post('/api/signup', async (req, res) => {
    try {
      const { email, name, phone, password, type } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ email, name, phone, password, type });
      await newUser.save();
  
      res.status(201).json({ user: newUser });
    } catch (error) {
      console.error('Signup error:', error.message);  // Log the error
      console.error(error.stack);  // Log stack trace for debugging
      res.status(500).json({ message: 'Server error, could not create user' });
    }
  });
  

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

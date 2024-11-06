// MongoDB Playground for Atlas
// To use this playground:
// 1. Open MongoDB Compass
// 2. Connect to your MongoDB Atlas cluster using the connection string
// 3. Create a new playground and paste this code

// Switch to your database
use('NeighbourNet');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "type": 1 });

// Insert test users
db.users.insertMany([
  {
    email: "customer1@example.com",
    name: "Customer One",
    phone: "1234567890",
    type: "customer",
    createdAt: new Date()
  },
  {
    email: "worker1@example.com",
    name: "Worker One",
    phone: "9876543210",
    type: "worker",
    createdAt: new Date()
  }
]);

// Useful queries for data exploration
// 1. Count total users
db.users.countDocuments({});

// 2. Count users by type
db.users.aggregate([
  {
    $group: {
      _id: "$type",
      count: { $sum: 1 }
    }
  }
]);

// 3. Find latest registered users
db.users.find({})
  .sort({ createdAt: -1 })
  .limit(5);

// 4. Find users by type with projection
db.users.find(
  { type: "worker" },
  { name: 1, email: 1, phone: 1 }
);

// 5. Search users by name (case-insensitive)
db.users.find({
  name: { $regex: "one", $options: "i" }
});
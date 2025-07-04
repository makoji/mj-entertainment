// server.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const cors = require('cors');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(cors()); // Use cors middleware
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

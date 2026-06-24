const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./routes/bfhl.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', bfhlRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'BFHL API is running' });
});

// 404 Route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

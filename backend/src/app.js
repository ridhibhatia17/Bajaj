const express = require('express');
const cors = require('cors');
const bfhlRoutes = require('./routes/bfhl.route');
const bfhlController = require('./controllers/bfhl.controller');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', bfhlRoutes);

// Fallback routes (in case Vercel env variable is missing /bfhl)
app.post('/', bfhlController.handlePostBfhl);
app.get('/', bfhlController.handleGetBfhl);

// 404 Route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

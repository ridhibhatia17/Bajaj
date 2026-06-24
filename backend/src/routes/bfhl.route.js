const express = require('express');
const router = express.Router();
const bfhlController = require('../controllers/bfhl.controller');

// POST /bfhl
router.post('/', bfhlController.handlePostBfhl);

// GET /bfhl
router.get('/', bfhlController.handleGetBfhl);

module.exports = router;

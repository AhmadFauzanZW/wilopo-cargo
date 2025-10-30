const express = require('express');
const { calculateCost } = require('../controllers/calculatorController');

const router = express.Router();

router.post('/calculate-cost', calculateCost);

module.exports = router;

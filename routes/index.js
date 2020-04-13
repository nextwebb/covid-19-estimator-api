const express = require('express');
const router = express.Router();
const estimatorController = require('../controllers/estimatorController')

router.post('/api/v1/on-covid-19/:dataType', estimatorController.estimate);

module.exports = router;

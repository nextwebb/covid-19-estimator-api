const express = require('express');
const router = express.Router();
const estimatorController = require('../controllers/estimatorController')

router.post('/api/v1/on-covid-19/:dataType', estimatorController.estimate);
router.post('/api/v1/on-covid-19/', estimatorController.estimateDefault);
router.get('/api/v1/on-covid-19/logs', estimatorController.getAllLogs);

module.exports = router;

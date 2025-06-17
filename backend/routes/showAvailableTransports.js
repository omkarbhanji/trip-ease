const express = require('express');
const availableTransportController = require('../controller/availableTransportController');
const router = express.Router();

router.post('/availabletransports', availableTransportController.getAvailableTransports);

module.exports = router;
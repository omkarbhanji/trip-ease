const express = require('express');
const router = express.Router();
const transportController = require('../controller/TransportController.js');

router.post('/add-transport', transportController.addTransport);
router.get('/get-transport', transportController.getAllTranports);
router.patch('/update-transport/:id', transportController.addExistingTransports);

module.exports = router;

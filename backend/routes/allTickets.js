const express = require('express');

const router = express.Router();

const {getAllTickets} = require('../controller/allTicketsFetchController');

router.get('/get-all', getAllTickets);

module.exports = router;
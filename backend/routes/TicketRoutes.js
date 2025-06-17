const express = require('express');
const router = express.Router();
const TransportRouterController = require('../controller/ticketBooking');
const fetchTicketById = require('../controller/fetchTicketById');

router.post('/bookticket', TransportRouterController.bookTicket);
router.post('/fetch-ticket-by-id', fetchTicketById.fetchTicketById);
router.post('/cancel-booking', fetchTicketById.deleteTicket);



module.exports = router;


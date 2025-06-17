const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");

const transportRoutes = require('./routes/TransportRoutes');
const { bookTicket } = require('./controller/ticketBooking');
const ticketRoutes = require('./routes/TicketRoutes');
const { protect, restrictTo } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const availableTransportRoutes = require('./routes/showAvailableTransports');

const allTickets = require('./routes/allTickets');



const app = express();
app.use(express.json());
app.use(cors());


// app.use('/tranport',protect, restrictTo(["ADMIN"]) ,transportRoutes);
app.use('/transport',transportRoutes);
app.use('/ticket', protect, ticketRoutes);
app.use('/admin', authRoutes); 
app.use('/api', availableTransportRoutes);
app.use('/user', protect,  allTickets);



module.exports = app;
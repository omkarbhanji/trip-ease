const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

// ticketId: {
//     type: String,
//     required: true
// },
transportMode: {
    type: String,
    required: true
},
source: {
    type: String,
     required: true
},
destination: {
    type: String,
     required: true
},
departureDate: {
    type: String,
     required: true
},
arrivalDate: {
    type: String,
     required: true
},
bookingDate: {
    type: String,
     required: true,
     
},
arrivalTime: {
    type: String,
    required: true
}

});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
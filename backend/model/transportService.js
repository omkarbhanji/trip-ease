const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
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
 day: {
  type: String,
  required: true
 },
 time:{
  type: String,
  required: true
 },
 timeofJourney:{
  type: String,
  required: true,
  default: 0
 }
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;

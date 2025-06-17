const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailid: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true,
    default: ["NORMAL"]
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  contact: {
    type: Number,
    required: true
  },

bookedTickets: {
  type: [
    {
      ticketId: {
        type: String,
      }
    }
  ],
  default: []
}

});

const userData = mongoose.model("userDetails", userSchema);

module.exports = userData;

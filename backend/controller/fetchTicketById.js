const ticketSchema = require("../model/ticketDetails");
const userSchema = require('../model/userSchema');

exports.fetchTicketById = async (req, res) => {
  try {
    console.log("in fetch ticket by id route");
    const ticketArray = req.body.ticketArray;

    const ticketsArray = [];

    //   ticketArray.forEach(async (ticket) => {
    console.log(ticketArray);
    for (const ticket of ticketArray.alltickets) {
      console.log("Ticket id is :  ", ticket.ticketId);
      const fetched_ticket = await ticketSchema.findById(ticket.ticketId);
      ticketsArray.push(fetched_ticket);
    }

    console.log("Tickets array is as follows: ", ticketsArray);

    res.status(200).json({ ticketArray: ticketsArray });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const userId = req.user._id;
    const Id = req.body.ticketId;

    const deleted = await ticketSchema.findByIdAndDelete(Id);

    const deleteFromUserArray = await userSchema.updateOne(
  { _id: userId},
  { $pull: { bookedTickets: { ticketId: Id } } }
);

    


    res.status(200).json({ message: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

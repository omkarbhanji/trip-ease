const Ticket = require('../model/ticketDetails');
const User = require('../model/userSchema');

exports.getAllTickets = async (req, res) => {
    const userId = req.user._id;
    console.log(req.user);
    // const userId = "6846af2e3aca21d8b863a76a";
    try{
        const allTickets = await User.findOne({_id: userId});
        console.log("There are all the tickets"  );
        console.log(allTickets.bookedTickets);
        res.status(200).json({alltickets: allTickets.bookedTickets} );

//       user.bookedTickets.forEach((ticket, index) => {
//   console.log(`Ticket ${index + 1}:`, ticket);
// });

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }
};
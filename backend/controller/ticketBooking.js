const Ticket = require('../model/ticketDetails');
const User = require('../model/userSchema');

// so ticket should contain ticketId, transportMode, departureDate, arrivalDate, bookingDate

exports.bookTicket = async (req, res) => {
    console.log("i am in book ticket function !")
    const userId = req.user._id;
    console.log("This is user id: ", userId);
    const {transportMode, source, destination, departureDate, arrivalDate, arrivalTime} = req.body;
    bookingDate = new Date();
    try{
        const existingTicket = await Ticket.findOne({
            transportMode: req.body.transportMode,
            source: req.body.source,
            destination: req.body.destination,
            departureDate: req.body.departureDate,
            
        });

        if(existingTicket){
            console.log("it is an existing ticket")
            return res.status(200).json({message: " Ticket already exists ", data: existingTicket});
        }
        const newTicket = new Ticket({
            transportMode,
            source,
            destination,
            departureDate,
            arrivalDate,
            bookingDate,
            arrivalTime
        });

        
        await newTicket.save();
        await User.findByIdAndUpdate(userId, {$push: {bookedTickets: {ticketId: newTicket._id}}}, {new: true});
        const finalUserObject = await User.findOne({_id: userId});
        console.log(finalUserObject)
        res.status(201).json({ message: "Ticket Booked", data: newTicket });
    } 
    catch(err){
        res.status(500).json({error: err.message});
    }
} 
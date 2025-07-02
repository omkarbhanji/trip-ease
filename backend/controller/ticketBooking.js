const Ticket = require('../model/ticketDetails');
const User = require('../model/userSchema');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "bhanjiomkar@gmail.com",
    pass: "ojvb rwsj wqtc omjo"
  }
});


exports.bookTicket = async (req, res) => {
  console.log("i am in book ticket function!");
  console.log("req.user:", req.user);

  const userId = req.user?._id;  
  console.log("This is user id:", userId);

  const { transportMode, source, destination, departureDate, arrivalDate, arrivalTime } = req.body;
  const bookingDate = new Date();

  try {
    const existingTicket = await Ticket.findOne({
      transportMode,
      source,
      destination,
      departureDate,
    });

    if (existingTicket) {
      console.log("it is an existing ticket");
      return res.status(200).json({ message: "Ticket already exists", data: existingTicket });
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

    await User.findByIdAndUpdate(
      userId,
      { $push: { bookedTickets: { ticketId: newTicket._id } } },
      { new: true }
    );

    const mailOptions = {
      from: "bhanjiomkar@gmail.com",
      to: "bhanjiomkar@gmail.com",
      subject: 'Your Ticket Confirmation',
      html: `
        <h2>Ticket Confirmation</h2>
        <p>Thank you for booking with us!</p>
        <p><strong>Ticket ID:</strong> ${newTicket._id}</p>
        <p><strong>From:</strong> ${source}</p>
        <p><strong>To:</strong> ${destination}</p>
      `
    };

    const mail_status = await transporter.sendMail(mailOptions);
    console.log("mail status is : ", mail_status);
    res.status(201).json({ message: "Ticket Booked", data: newTicket });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: err.message });
  }
};

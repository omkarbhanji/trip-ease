import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";
import axios from 'axios';
import styles from './TicketCard.module.css';

const BookingCard = ({ticket, onCancel}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(ticket); 
  }, []);
  const[id, setId] = useState(null);

  const handleCancelBooking = async() => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
  if (confirmCancel) {

    console.log(ticket._id);
    const token = localStorage.getItem("token");
    const response = await axios.post('http://localhost:5000/ticket/cancel-booking', {ticketId: ticket._id}, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
    alert("Your ticket has been cancelled successfully");
      onCancel(ticket._id);
    console.log("Booking canceled.");
  } else {
    console.log("Booking not canceled.");
  }
  };
  
  return (
 <div className={styles.ticketCard}>
  <h3>{ticket.transportMode}</h3>
  <p><strong>Source:</strong> {ticket.source}</p>
  <p><strong>Destination:</strong> {ticket.destination}</p>
  <p><strong>Departure Date:</strong> {ticket.departureDate}</p>
  <p><strong>Arrival Date:</strong> {ticket.arrivalDate}</p>
  <p><strong>Booking Date:</strong> {ticket.bookingDate}</p>
  <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
  <button onClick={handleCancelBooking} className={styles.cancelButton}>
    Cancel Booking
  </button>
</div>
  )
}

export default BookingCard

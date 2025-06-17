import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from "./TicketSuccess.module.css";
const token = localStorage.getItem('token');


const BookTicket =  () => {

  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("No Error");
  const navigate = useNavigate();

  const handleGotoMyBookings = () => {
    navigate('/my-bookings');
  };

function calculateArrival(departureDate, departureTime, durationInHours) {
 
  const departureDateTimeStr = `${departureDate}T${departureTime}:00`;


  const departureDateTime = new Date(departureDateTimeStr);

  const durationMs = durationInHours * 60 * 60 * 1000;
  const arrivalDateTime = new Date(departureDateTime.getTime() + durationMs);

  
  const arrivalDate = arrivalDateTime.toISOString().split("T")[0];
  const arrivalTime = arrivalDateTime.toTimeString().slice(0, 5); 

  return { arrivalDate, arrivalTime };
}



  
    const location = useLocation();

    useEffect(() => {
    const bookTicket = async () => {
      try {
        console.log(location.state);
        const transport = location.state.transport;
        const date = location.state.date;
          console.log( date, transport.time,transport.timeofJourney);
        const {arrivalDate, arrivalTime} = calculateArrival(date, transport.time, transport.timeofJourney);

        const newTicket = {
          transportMode: transport.transportMode,
          source: transport.source,
          destination: transport.destination,
          departureDate: date,
          arrivalDate: arrivalDate,
          bookingDate: new Date().toISOString(),
          arrivalTime: arrivalTime
        };
        console.log("New ticket is: ", newTicket);
       
        const response = await axios.post(
          'http://localhost:5000/ticket/bookticket',
          newTicket, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
        );
         console.log(response);
        console.log('Ticket booked. Status:', response.status);
        setTicket(response.data.data);
      } catch (err) {
        console.error('Booking failed:', err);
        setErrorMessage(err.message);
      }
    };

    bookTicket();
  }, [location]);
    
  return (
<div className={styles.container}>
      {ticket ? (
        <div>
          <h3 className={styles.heading}>Ticket Booked Successfully!</h3>
          <p className={styles.detail}><strong>Ticket ID:</strong> {ticket._id}</p>
          <p className={styles.detail}><strong>Transport Mode:</strong> {ticket.transportMode}</p>
          <p className={styles.detail}><strong>Source:</strong> {ticket.source}</p>
          <p className={styles.detail}><strong>Destination:</strong> {ticket.destination}</p>
          <p className={styles.detail}><strong>Departure Date:</strong> {ticket.departureDate}</p>
          <p className={styles.detail}><strong>Arrival Date:</strong> {ticket.arrivalDate}</p>
          <p className={styles.detail}><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
          <p className={styles.detail}><strong>Booking Date:</strong> {ticket.bookingDate}</p>
        </div>
      ) : (
        <h3 className={styles.heading}>errorMessage</h3>
      )}
      <button className={styles.button} onClick={handleGotoMyBookings}>
        Go To My Bookings
      </button>
    </div>
);

}

export default BookTicket

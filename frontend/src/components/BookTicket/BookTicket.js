import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from "./TicketSuccess.module.css";
const token = localStorage.getItem('token');


const BookTicket =  () => {

  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const handleGotoMyBookings = () => {
    navigate('/my-bookings');
  };

function calculateArrival(departureDate, departureTime, durationInHours) {
  console.log("calculateArrival called with:", departureDate, departureTime, durationInHours);

  if (!departureDate || !departureTime || typeof durationInHours !== "number") {
    throw new Error("Invalid input: departureDate, departureTime, or durationInHours missing or invalid");
  }

  // Ensure date is in YYYY-MM-DD and time is HH:MM
  const datePart = departureDate.trim();
  const timePart = departureTime.trim();

  const departureDateTimeStr = `${datePart}T${timePart}:00`; 
  const departureDateTime = new Date(departureDateTimeStr);

  console.log("departureDateTimeStr:", departureDateTimeStr);
  console.log("departureDateTime:", departureDateTime);

  if (isNaN(departureDateTime.getTime())) {
    throw new Error(`Invalid departure date or time: ${departureDateTimeStr}`);
  }

  const durationMs = durationInHours * 60 * 60 * 1000;
  const arrivalDateTime = new Date(departureDateTime.getTime() + durationMs);

  if (isNaN(arrivalDateTime.getTime())) {
    throw new Error("Invalid arrival date calculation");
  }

  const arrivalDate = arrivalDateTime.toISOString().split("T")[0];
  const arrivalTime = arrivalDateTime.toTimeString().slice(0, 5); // HH:MM

  return { arrivalDate, arrivalTime };
}



  
    const location = useLocation();

    useEffect(() => {
  const bookTicket = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const transport = location.state?.transport;
      const date = location.state?.date;

      if (!transport || !date) {
        throw new Error("Missing transport or date info");
      }

      const time = transport.time || "00:00";
      const duration = Number(transport.timeofJourney) || 0;

      const { arrivalDate, arrivalTime } = calculateArrival(date, time, duration);

      const newTicket = {
        transportMode: transport.transportMode,
        source: transport.source,
        destination: transport.destination,
        departureDate: date,
        arrivalDate,
        bookingDate: new Date().toISOString(),
        arrivalTime
      };

      const response = await axios.post(
        'http://localhost:5000/ticket/bookticket',
        newTicket,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTicket(response.data.data);
    } catch (err) {
      console.error('Booking failed:', err);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  bookTicket();
}, [location]);

    
  return (
<div className={styles.container}>
      {loading ? (
    <h3 className={styles.heading}>Booking your ticket, please wait...</h3>
  ) : ticket ? (
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

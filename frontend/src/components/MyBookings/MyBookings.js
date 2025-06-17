import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const [tickets, setTickets] = useState([]);
 

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/user/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);

      const bookedTickets = response.data || [];

      if (bookedTickets.length === 0) {
        setTickets([]);
        return;
      }



      const allTickets = await axios.post(
        "http://localhost:5000/ticket/fetch-ticket-by-id",
        {
          ticketArray: response.data, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log(allTickets.data.ticketArray);
      setTickets(allTickets.data.ticketArray);
    };


    fetchTickets();
  }, []);

  
    const handleCancel = (ticketId) => {
    setTickets(prev => prev.filter(ticket => ticket._id !== ticketId));
  };


  return (
    <div>
      {/* <h2>My Bookings</h2>

      {tickets.map((ticket) => (
        <BookingCard key={ticket._id} ticket={ticket} />
      ))} */}

     
 
    <h2>My Bookings</h2>
    {tickets.length === 0 ? (
      <p>No tickets booked yet.</p>
    ) : (
      tickets.map((ticket) => (
        <BookingCard key={ticket._id} ticket={ticket} onCancel={handleCancel}/>
      ))
    )}
  

    </div>
  );
};

export default MyBookings;

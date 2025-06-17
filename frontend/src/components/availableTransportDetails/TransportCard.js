import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";
import styles from "./TransportCard.module.css";

const TransportCard = ({transport, selectedDate}) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(transport); 
  }, []);
  const[id, setId] = useState("");
  const handleBookNow = async (e) =>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("This is token: " + token);
    console.log(transport);
    
    navigate('/book-ticket', {state: {
      transport: transport,
      date: selectedDate
    } });
       
  }
  return (
  <div className={styles.card}>
      <h3 className={styles.heading}>{transport.transportMode}</h3>

      <div className={styles.route}>
        <span className={styles.location}>{transport.source}</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.location}>{transport.destination}</span>
      </div>

      <p className={styles.details}><strong>Day:</strong> {transport.day}</p>
      <p className={styles.details}><strong>Departure Time:</strong> {transport.time}</p>
      <p className={styles.details}><strong>Time of Journey:</strong> {transport.timeofJourney} Hrs</p>

      <button className={styles.button} onClick={handleBookNow}>Book now</button>
    </div>

  )
}

export default TransportCard

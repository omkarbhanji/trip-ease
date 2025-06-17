import React, { useState } from "react";
import axios from 'axios';
import styles from './TransportForm.module.css';

const AddTransports = () => {
    const [transportMode, settransportMode] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [timeofJourney, setTimeOfJourney] = useState("");

  const handleSubmit = async (e) => {
    // 
    // console.log(source + " " + destination + " " + day + " " + time + " " + transportMode);
    // const response = await axios.post('http://localhost:5000/transport/add-transport',{transportMode: transportMode, source: source, destination: destination, day: day, time: time});

    // if(response.status == 201){
    //   alert('trnaport added succesfully');
    // }
    // else if(response.status ===409){
    //   alert('Transport already exists')
    // }else{
    //   alert('Internal server error');
    // }

    
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/transport/add-transport', {
      transportMode,
      source,
      destination,
      day,
      time,
      timeofJourney
    });

    if (response.status === 201) {
      alert('Transport added successfully');
    } else {
      alert('Unexpected response from server');
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert('Transport already exists');
    } else {
      alert('Internal server error');
    }
    console.error(error);
  }
};

  return (
     <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Mode of Transport:</label>
        <select className={styles.select} value={transportMode} onChange={(e) => settransportMode(e.target.value)}>
          <option value="default">--Select a mode--</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Flight">Flight</option>
        </select>

        <label className={styles.label}>Source:</label>
        <input type="text" className={styles.input} value={source} onChange={(e) => setSource(e.target.value)} />

        <label className={styles.label}>Destination:</label>
        <input type="text" className={styles.input} value={destination} onChange={(e) => setDestination(e.target.value)} />

        <label className={styles.label}>Choose a Day:</label>
        <select className={styles.select} value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="default">--Select a day--</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <label className={styles.label}>Departure Time:</label>
        <input type="time" className={styles.input} value={time} onChange={(e) => setTime(e.target.value)} />

        <label className={styles.label}>Time of Journey:</label>
        <input type="time" className={styles.input} value={timeofJourney} onChange={(e) => setTimeOfJourney(e.target.value)} />

        <button type="submit" className={styles.button} disabled={!transportMode || !source || !destination || !time || !timeofJourney || !day}>
          Add Transport
        </button>
      </form>
    </div>
  );
};

export default AddTransports;

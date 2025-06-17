import React, { useState } from "react";
import { useAsyncError } from "react-router";
import axios from "axios";
import AvailableTransports from "../availableTransportDetails/AvailableTransports";
import { useNavigate } from "react-router";
import styles from './SearchForm.module.css';


const LocationSelector = () => {

  const handleSourceChange = (e) => {
  const selectedSource = e.target.value;
  if (selectedSource === destination) {
    alert("Source and destination cannot be the same.");
  } else {
    setSource(selectedSource);
  }
};

const handleDestinationChange = (e) => {
  const selectedDestination = e.target.value;
  if (selectedDestination === source) {
    alert("Source and destination cannot be the same.");
  } else {
    setDestination(selectedDestination);
  }
};



  
  const navigate = useNavigate();
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(source  + " + " + destination + " + " + date);
try{

    const date_obj = new Date(date);
    const day = date_obj.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const response = await axios.post('http://localhost:5000/api/availabletransports', {source: source, destination: destination, day: days[day]});
    response.data.date = date;
console.log(response.data);
    if(!response){
      navigate('/homepage');
    }
    else{
      // console.log(response);
      navigate('/available-transports', {state: response.data});
    }

  }

  catch(error){
    console.log(error);
    alert('Error');
  }
    
  };

  return (
    <div className={styles.formContainer}>
  <form onSubmit={handleSubmit}>
    <label htmlFor="source">Source</label>
    <select id="source" value={source} onChange={handleSourceChange}>
      <option value="">--select source--</option>
      <option value="Pune">Pune</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Goa">Goa</option>
    </select>

    <label htmlFor="destination">Destination</label>
    <select id="destination" value={destination} onChange={handleDestinationChange}>
      <option value="">--select destination--</option>
      <option value="Pune">Pune</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Goa">Goa</option>
    </select>

    <label htmlFor="date">Date</label>
    <input
      type="date"
      id="date"
      min={new Date().toISOString().split("T")[0]}
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <button type="submit" disabled={!source || !destination || !date}>
      Search
    </button>
  </form>
</div>
  );
};

export default LocationSelector;

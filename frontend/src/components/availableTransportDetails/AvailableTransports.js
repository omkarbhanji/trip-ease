import React from 'react'
import { useLocation } from 'react-router'
import { useEffect } from 'react';
import TransportCard from './TransportCard';

const AvailableTransports = () => {

  const location = useLocation();
  
  const data = location.state.transports;
  
  // const selectedDate = location.state.;
console.log(location.state.date);

  // console.log("The selected date is : " + selectedDate);

  return (
    <div>
      <h2>Available Transports</h2>
     
      {data.map((transport) => (
        <TransportCard key={transport._id} transport={transport} selectedDate={location.state.date}/>
      ))}
    </div>
  )
}

export default AvailableTransports

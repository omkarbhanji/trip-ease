import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react';
import TransportCard from './TransportCard';
import styles from './TransportTable.module.css';

const EditTransport = () => {

    const [transports, setTransports] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {

            try{
            const response = await axios.get('http://localhost:5000/transport/get-transport');
                // console.log(response.data);
                setTransports(response.data.data)
            }
            catch(err){
                console.log(err);
            }

        };
        fetchData();
    }, []);
console.log(transports);
  return (
 
<div className={styles.tableWrapper}>
  <table className={styles.transportTable}>
    <thead>
      <tr>
        <th>Mode</th>
        <th>Source</th>
        <th>Destination</th>
        <th>Day</th>
        <th>Time</th>
        <th>Journey Time</th>
        <th className={styles.actionsCell}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {transports.map((transport) => (
        <TransportCard key={transport._id} transport={transport} />
      ))}
    </tbody>
  </table>
</div>
  )
}

export default EditTransport

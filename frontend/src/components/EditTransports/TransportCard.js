import React from "react";
import { useState, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router";
import axios from "axios";
import styles from './TransportRow.module.css';

const TransportCard = ({ transport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(transport);
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(transport);
  }, []);
  const [id, setId] = useState("");
  const handleChange = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const hasChanged = Object.keys(transport).some(
      (key) => transport[key] !== updatedData[key]
    );
    setIsChanged(hasChanged);
  };

  const handleSave = () => {
    // Send formData to backend

    updateTransport(formData);
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setFormData(transport);
    setIsEditing(false);
    setIsChanged(false);
  };

  const updateTransport = async (changedTransport) => {
    
    try{ 
      console.log(changedTransport);
      const response = await axios.patch(`http://localhost:5000/transport/update-transport/${changedTransport._id}`, changedTransport);
      console.log(response.data.updated);
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }
  return isEditing ? (
      <tr className={styles.editRow}>
    <td>
      <input name="transportMode" value={formData.transportMode} onChange={handleChange} />
    </td>
    <td>
      <input name="source" value={formData.source} onChange={handleChange} />
    </td>
    <td>
      <input name="destination" value={formData.destination} onChange={handleChange} />
    </td>
    <td>{transport.day}</td>
    <td>
      <input name="time" value={formData.time} onChange={handleChange} />
    </td>
    <td>
      <input name="timeofJourney" value={formData.timeofJourney} onChange={handleChange} />
    </td>
    <td>
      <button className={styles.saveButton} onClick={handleSave} disabled={!isChanged}>Save</button>
      <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
    </td>
  </tr>
) : (
  <tr className={styles.viewRow}>
    <td>{transport.transportMode}</td>
    <td>{transport.source}</td>
    <td>{transport.destination}</td>
    <td>{transport.day}</td>
    <td>{transport.time}</td>
    <td>{transport.timeofJourney} hrs</td>
    <td>
      <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
    </td>
  </tr>

    )

  
};

export default TransportCard;

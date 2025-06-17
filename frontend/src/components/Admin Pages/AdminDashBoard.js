import React from "react";
import { useNavigate } from "react-router";
import styles from './AdminControls.module.css';

const AdminDashBoard = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className={styles.control}>
        <div className={styles.cardButton} onClick={() => navigate('/add-transport')}>Add Transport</div>
        <div className={styles.cardButton} onClick={() => navigate('/edit-transport')}>Edit Transport</div>
        <div className={styles.cardButton} onClick={() => navigate('/delete-transport')}>Delete Transport</div>
        <div className={styles.cardButton} onClick={() => navigate('/add-admin')}>Add Admin Account</div>
      </div>
    </div>
      
  
  );
};

export default AdminDashBoard;

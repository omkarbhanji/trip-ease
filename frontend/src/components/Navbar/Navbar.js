import React from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '14px 5vw',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    overflowX: 'auto', // prevent overflow
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '16px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#007bff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };
  const isLoggedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav style={navbarStyle}>
      <div style={brandStyle} onClick={() => navigate('/homepage')}>
        TripEase
      </div>
      <div style={navLinksStyle}>
        <span style={linkStyle} onClick={() => navigate('/homepage')}>Home</span>
        
         {isLoggedIn && (
         <span style={linkStyle} onClick={() => navigate('/my-bookings')}>My Bookings</span>
        )}
        {isLoggedIn && (
          <span style={linkStyle} onClick={handleLogout}>Logout</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

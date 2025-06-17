import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    // const currentTime = Date.now() / 1000; // Current time in seconds
    // // console.log(payload.exp, currentTime);
    // return payload.exp > currentTime; // Check if token is expired
    if(token) return true;
    
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children, requiredRoles }) => {
  if (!isAuthenticated()) {
    
    return <Navigate to="/login" replace />;
  }


  console.log(requiredRoles);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userRoles = decoded.roles;

  console.log(userRoles);

const hasAccess = userRoles.some(role => requiredRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }


  return children;
};

export default ProtectedRoute;
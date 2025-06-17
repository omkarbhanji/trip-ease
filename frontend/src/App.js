import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationSelector from './components/homepage/LocationSelector';
import AvailableTransports from './components/availableTransportDetails/AvailableTransports';
import AddTransports from './components/EditTransports/AddTransports';
import ProtectedRoute from './components/ProtectedRoutes';
import SignUp from './components/SignUp/SignUp';
import BookTicket from './components/BookTicket/BookTicket';
import MyBookings from './components/MyBookings/MyBookings';
import Navbar from './components/Navbar/Navbar';
import Unauthorized from './components/ErrorPages/Unauthorized';
import AdminDashBoard from './components/Admin Pages/AdminDashBoard';
import EditTransport from './components/EditTransports/EditTransport';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>

          <Route path = '/homepage' element = { <ProtectedRoute requiredRoles={['ADMIN', 'NORMAL']}><LocationSelector /></ProtectedRoute>} />
          <Route path = '/admin-dashboard' element = { <ProtectedRoute requiredRoles={['ADMIN']}><AdminDashBoard /></ProtectedRoute>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/signup' element = {<SignUp />} />
          <Route path = '/available-transports' element = {<ProtectedRoute requiredRoles={['ADMIN', 'NORMAL']}><AvailableTransports /></ProtectedRoute>} />
          <Route path = '/add-transport' element = {<ProtectedRoute requiredRoles={['ADMIN']}><AddTransports /></ProtectedRoute>} />
          <Route path = '/edit-transport' element = {<ProtectedRoute requiredRoles={['ADMIN']}><EditTransport /></ProtectedRoute>} />
          <Route path = '/book-ticket' element = {<ProtectedRoute requiredRoles={['ADMIN', 'NORMAL']}><BookTicket /></ProtectedRoute>} />
          <Route path = '/my-bookings' element = {<ProtectedRoute requiredRoles={['ADMIN', 'NORMAL']}><MyBookings /></ProtectedRoute>} />
          <Route path = '/unauthorized' element = {<Unauthorized />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

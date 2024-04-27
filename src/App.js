import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Homepage  from './pages/Homepage';
import  Roomspage  from './pages/Roomspage';
import  Bookingpage  from './pages/Bookingpage';
import  Confirmationpage  from './pages/Confirmationpage';
import  SignupPage  from './pages/SignupPage';
import  LoginPage from './pages/LoginPage';
import axios from 'axios';
import { UserContext, UserContextProvider } from './UserContext';
import Boyspage from './pages/BoysPage';
import Girlspage from './pages/GirlsPage';
import Floorspage from './pages/FloorsPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage/>} />
          <Route path="/hostels/:hostelId/rooms" element={<Roomspage />} />
          <Route path="/booking" element={<Bookingpage />} />
          <Route path="/confirmation" element={<Confirmationpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hostels/boys" element={<Boyspage />} />
          <Route path="/hostels/girls" element={<Girlspage />} />
          <Route path="/floor" element={<Floorspage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
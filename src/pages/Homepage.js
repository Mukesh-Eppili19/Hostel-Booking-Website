// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import CSS file for styling

function Homepage() {
  return (
    <div className="homepage">
      <div className="container">
        <h1>Welcome to Hostel Booking </h1>
        <div className="hostel-options">
          <div className="hostel-option">
            <Link to="/hostels/boys">
              <img src="/boys.jpeg" alt="Boys Hostel" />
              <h2>Boys Hostel</h2>
            </Link>
          </div>
          <div className="hostel-option">
            <Link to="/hostels/girls">
              <img src="/girls.jpeg" alt="Girls Hostel" />
              <h2>Girls Hostel</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

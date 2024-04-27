// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import './Girlspage.css'; // Import CSS for styling



function HomePage() {
  return (
    <div className="homepage-container">
      <h2>Welcome to Girls Hostel Booking</h2>
      <div className="button-container">
        <Link to="/hostels/1st-year" className="year-button">
          <div className="button-content">
            <img src="/gfirst.jpeg" alt="1st Year" />
            <span>1st Year</span>
          </div>
        </Link>
        <Link to="/hostels/2nd-year" className="year-button">
          <div className="button-content">
            <img src="/gsecond.jpeg" alt="2nd Year" />
            <span>2nd Year</span>
          </div>
        </Link>
        <Link to="/hostels/3rd-year" className="year-button">
          <div className="button-content">
            <img src="/gthird.jpeg" alt="3rd Year" />
            <span>3rd Year</span>
          </div>
        </Link>
        <Link to="/hostels/4th-year" className="year-button">
          <div className="button-content">
            <img src="/gfour.jpeg" alt="4th Year" />
            <span>4th Year</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

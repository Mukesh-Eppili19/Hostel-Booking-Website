import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Boyspage.css"; // Import CSS for styling

function BoysPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle year selection
  const handleYearSelection = async (year) => {
    setSelectedYear(year);
    setLoading(true);
    try {
      const response = await axios.post("/fetchHostels", {
        type: "Male",
        year: year,
      });
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch hostels for initial load
    handleYearSelection("one");
  }, []); // Empty dependency array ensures useEffect runs only once on initial render

  return (
    <div className="boys-page-container">
      <h2>Welcome to Boys Hostel Booking</h2>
      <div className="button-container">
        <button className="year-button" onClick={() => handleYearSelection("one")}>
          <div className="button-content">
            <img src="/first.jpeg" alt="1st Year" />
            <span>1st Year</span>
          </div>
        </button>
        <button className="year-button" onClick={() => handleYearSelection("two")}>
          <div className="button-content">
            <img src="/second.jpeg" alt="2nd Year" />
            <span>2nd Year</span>
          </div>
        </button>
        <button className="year-button" onClick={() => handleYearSelection("three")}>
          <div className="button-content">
            <img src="/third.png" alt="3rd Year" />
            <span>3rd Year</span>
          </div>
        </button>
        <button className="year-button" onClick={() => handleYearSelection("four")}>
          <div className="button-content">
            <img src="/four.jpeg" alt="4th Year" />
            <span>4th Year</span>
          </div>
        </button>
      </div>

      {/* Display hostels for the selected year */}
      <div className="hostels-container">
        <h3>Available Hostels</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="hostels">
            {hostels.map((hostel, index) => (
              <div className="hostel-card" key={index}>
                <img src={`${hostel.photos[0]}`} alt={hostel.name} />
                <div className="hostel-details">
                  <h4>{hostel.name}</h4>
                  <p>{hostel.description}</p>
                  <Link to={`/hostels/${hostel._id}/rooms`}>View Rooms</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BoysPage;

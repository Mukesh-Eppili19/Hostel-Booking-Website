import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Roomspage.css'; // Import CSS file

function Roomspage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState(null); // Initially set to null
  const { hostelId } = useParams();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`/hostels/${hostelId}/rooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hostelId]);

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value !== 'All' ? parseInt(event.target.value) : null); // Parse to integer
  };

  const bookRoom = async (roomId) => {
    try {
      const bookedRoom = rooms.find(room => room._id === roomId && room.bedsAvailable > 0);
      if (!bookedRoom) {
        alert('No beds available in this room.');
        return;
      }

      // Update the number of available beds for the booked room
      const updatedRooms = rooms.map(room => {
        if (room._id === roomId) {
          return { ...room, bedsAvailable: room.bedsAvailable - 1 };
        }
        return room;
      });

      // Update the state with the modified rooms
      setRooms(updatedRooms);

      // Generate PDF receipt
      const doc = new jsPDF();
      doc.text(`Room Number: ${bookedRoom.roomNumber}`, 10, 10);
      doc.text(`Hostel Block: ${bookedRoom.blockName}`, 10, 20);
      doc.text(`Floor: ${bookedRoom.floor}`, 10, 30);
      doc.save('receipt.pdf');

      // Show confirmation message
      alert('Room booked successfully!');
    } catch (error) {
      console.error('Error booking room:', error);
      alert('An error occurred while booking the room. Please try again later.');
    }
  };

  const filteredRooms = selectedFloor === null ? [] : (selectedFloor === 'All' ? rooms : rooms.filter(room => room.floor === selectedFloor));

  // Function to chunk the array into arrays of size n
  const chunkArray = (myArray, chunkSize) => {
    const results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
    }
    return results;
  };

  const roomsInRows = chunkArray(filteredRooms, 5); // Split filteredRooms into rows of 5 rooms

  return (
    <div className="container">
      <h2 className="heading">Rooms Available:</h2>
      <div className="filter-container">
        <label htmlFor="floor-select">Select Floor:</label>
        <select id="floor-select" value={selectedFloor || 'Select'} onChange={handleFloorChange}>
          <option disabled>Select Floor</option>
          <option value="All">All Floors</option>
          {/* Add options dynamically based on available floors */}
          {Array.from(new Set(rooms.map(room => room.floor))).map(floor => (
            <option key={floor} value={floor}>{`Floor ${floor}`}</option>
          ))}
        </select>
      </div>
      {selectedFloor !== null && (
        loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="room-list">
            {roomsInRows.map((row, index) => (
              <div key={index} className="room-row">
                {row.map(room => (
                  <div key={room._id} className="room-item">
                    <h3>Room {room.roomNumber}</h3>
                    <p>Floor: {room.floor}</p>
                    <p>Beds Available: {room.bedsAvailable}</p>
                    <button
                      className={`book-button ${room.bedsAvailable === 0 ? 'book-button-unavailable' : 'book-button-available'}`}
                      onClick={() => bookRoom(room._id)}
                      disabled={room.bedsAvailable === 0}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Roomspage;

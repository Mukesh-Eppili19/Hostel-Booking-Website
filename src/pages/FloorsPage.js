import React from 'react';
import './FloorsPage.css';
function Floors({ numberOfFloors }) {
  const floors = Array.from({ length: numberOfFloors }, (_, i) => `Floor ${i}`);

  return (
    <div className="building">
      <h1 className="heading">Select Your View</h1>
      <div className="floors-container">
        {floors.map((floor, index) => (
          <div key={index} className="floor">
            <h2>{floor}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Floors;
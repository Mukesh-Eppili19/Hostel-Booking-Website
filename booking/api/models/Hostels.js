const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Mixed'],
    required: true,
  },
  availableForYear: {
    type: String,
    required: true,
  },
  photos: [{
    type: String,
  }],
  numberOfFloors: {
    type: Number,
    required: true,
  },
  roomsPerFloor: {
    type: Number,
    required: true,
  },
  availableBeds: [{
    floor: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    bedsAvailable: {
      type: Number,
      required: true,
    },
  }],
});
const Hostels = mongoose.model('Hostels', hostelSchema);
module.exports = Hostels;

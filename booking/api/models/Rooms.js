// Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostels', // Refers to the Hostels model
    required: true,
  },
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
});

// Virtual property to populate hostel details
roomSchema.virtual('hostelDetails', {
  ref: 'Hostels', // Refers to the Hostels model
  localField: 'hostel',
  foreignField: '_id',
  justOne: true,
  // Custom function to extract floor, roomNumber, and bedsAvailable from availableBeds array
  populate: {
    path: 'availableBeds',
    select: 'floor roomNumber bedsAvailable -_id',
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

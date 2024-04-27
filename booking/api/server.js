const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User.js');
const Hostels = require('./models/Hostels.js');
const Rooms = require('./models/Rooms.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

const MONGO_URL = 'mongodb+srv://mukesh:242004Me@cluster0.lkvbauj.mongodb.net/';
mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

app.get('/test' , (req, res) => {
    res.json('test ok');
})

// Register route
app.post('/signup', async (req, res) => {
    
    const { name, rollNumber, registrationNumber, mobileNumber, gender, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDoc = await User.create({
            name,
            rollNumber,
            registrationNumber,
            mobileNumber,
            gender,
            email,
            password: hashedPassword
        });

        res.status(201).json(userDoc);
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });
 

app.post('/fetchHostels', async (req, res) => {
    const { type, year } = req.body;

    try {
        console.log('Received request to fetch hostels:', { type, year });

        // Query hostels based on type (boys/girls) and year
        const hostels = await Hostels.find({ gender: "Male" , availableForYear: year  });
        
        console.log('Retrieved hostels:', hostels);

        if (hostels.length === 0) {
            console.log('No hostels found for the specified criteria.');
        }

        res.json(hostels);
    } catch (error) {
        console.error('Error fetching hostels:', error);
        res.status(500).json({ error: 'Error fetching hostels' });
    }
});

app.get('/hostels/:hostelId/rooms', async (req, res) => {
    const { hostelId } = req.params;
  
    try {
      // Find the hostel by ID
      const hostel = await Hostels.findById(hostelId);
  
      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }
      const rooms = hostel.availableBeds;
  
      res.json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Error fetching rooms' });
    }
  });  

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

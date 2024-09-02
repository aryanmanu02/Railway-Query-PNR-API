const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Railway')
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));

const BookingSchema = new mongoose.Schema({
 trainNo: {
    type: String,
    required: false
 },
 source: {
    type: [String],
    required: false
 },
 destination: {
    type: String,
    required: false
 },
 date: {
    type: Date,
    required: false
 },
 quota: {
    type: String,
    required: false
 },
 class: {
    type: String,
    required: false
 }
});

const Booking = mongoose.model('booking', BookingSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'project.html'));
});

app.post('/booking', (req, res) => {
    const formData = {
        trainNo: req.body.trainNo,
        source: req.body.source,
        destination: req.body.destination,
        date: req.body.date,
        quota: req.body.quota,
        class: req.body.class,
      };
 console.log('Received form data:', formData);
 const newBooking = new Booking(formData);
 newBooking.save()
    .then(booking => {
      console.log('Booking saved successfully:', booking);
      res.status(200).send('Booking saved successfully');
    })
    .catch(err => {
      console.error('Error saving booking:', err);
      res.status(500).send('Error saving booking');
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
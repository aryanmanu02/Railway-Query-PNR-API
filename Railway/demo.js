const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'project.html'));
});



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'railwayReservation';

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('reservations');

    // Define endpoint to handle form submission
    app.post('/booking', (req, res) => {
      const { trainNo, source, destination, date, quota, class: travelClass } = req.body;

      // Insert the form data into MongoDB
      collection.insertOne({
        trainNo,
        source,
        destination,
        date,
        quota,
        class: travelClass
      })
      .then(result => {
        console.log('Inserted document into MongoDB');
        res.status(200).send('Data inserted successfully');
      })
      .catch(err => {
        console.error('Error occurred while inserting document into MongoDB', err);
        res.status(500).send('Internal Server Error');
      });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error occurred while connecting to MongoDB', err);
  });

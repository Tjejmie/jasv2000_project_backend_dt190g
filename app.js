/** Include all needed modules */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');
const leagueRoutes = require('./routes/leagues');

/** Connection to use .env fie */
require('dotenv').config();
mongoose.connect(process.env.DB_SERVER);


/**
 * To handle errors after initial connection is established, we listen for error events 
 * on the connection. However, we still need to handle initial connection errors as 
 * shown below.
 */
mongoose.connection.on('error', err => {
    console.error('Error with connection to the MongoDB server: ' + err.message);
});

/**
 * A connecting event is emitted when Mongoose starts making its initial connection 
 * to the MongoDB server.
 */
mongoose.connection.on('connecting', () => {
    console.log('Connecting to the MongoDB server...');
});

/**
 * A connected event is emitted when Mongoose successfully makes its initial 
 * connection to the MongoDB server, or when Mongoose reconnects after losing 
 * connectivity. May be emitted multiple times if Mongoose loses connectivity.
 */
mongoose.connection.on('connected', () => {
    console.log('Connected to the MongoDB server');
});

/**
 * A disconnected event is emitted when Mongoose lost connection to the MongoDB 
 * server. This event may be due to your code explicitly closing the connection, 
 * the database server crashing, or network connectivity issues.
 */
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from the MongoDB server');
});


// Define the port the server will accept connections on
// If deployed to Azure, process.env.PORT is used
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

app.use(cors()); // CORS-enabled for all origins!

// Tell express to use a express.json, a built-in middleware in Express,
// that parses incoming requests with JSON payloads.
app.use(express.json());

// Tell express to use express.urlencoded, a built-in middleware in Express,
// that parses incoming requests with urlencoded payloads.
// The extended option is required. true is the default value and allows 
// for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));


// Connect all routes to the root of the app
app.use('/', teamRoutes);
app.use('/', playerRoutes);
app.use('/', leagueRoutes);


// Start the server
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
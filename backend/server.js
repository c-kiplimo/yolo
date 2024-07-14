const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const config = require('./config');
const dotenv = require('dotenv');


dotenv.config(); 

const productRoute = require('./routes/api/productRoute');

const env = process.env.NODE_ENV || 'development';
const mongodb_url = config.mongoURI[env];
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
    console.log('Database connected successfully');
});

// Check for DB Errors
db.on('error', (error) => {
    console.log(error);
});

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());

// Multer middleware
app.use(upload.array()); 

// CORS middleware
app.use(cors());

// Use Route
app.use('/api/products', productRoute);

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const config = require('./config');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const productRoute = require('./routes/api/productRoute');

// Determine environment and MongoDB URI
const env = process.env.NODE_ENV || 'development';
const mongodb_url = config.mongoURI[env];
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url;

// Initialize express
const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch((error) => console.log('Database connection error:', error));

// Middleware to parse JSON
app.use(express.json());

// Middleware for file uploads with multer
app.use(upload.array());

// Enable CORS for all routes
app.use(cors());

// Use the product routes
app.use('/api/products', productRoute);

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

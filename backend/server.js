const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userroute');
const router=require('./routes/EmployeeRoute');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = 4000;

dotenv.config();

// Connect to the database
connectDB();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Adjust according to your client app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json());
app.use('/uploads', express.static('uploads')); 
// Routes
app.use('/api', userRouter);
app.use('/api',router);
// Test route
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

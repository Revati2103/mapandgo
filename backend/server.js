const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.port || 8800
const pinRoute = require('./routes/pinRoutes')
const userRoute = require('./routes/userRoutes')
const path = require('path');

//Connect to mongodb database
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

//Add routes

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)

app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`))
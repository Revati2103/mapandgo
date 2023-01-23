const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.port || 8800
const pinRoute = require('./routes/pinRoutes')

//Connect to mongodb database
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

//Add routes

app.use("/api/pins", pinRoute)

app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`))
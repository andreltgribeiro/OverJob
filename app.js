const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser')

const userRoutes = require('./Routes/User')
const jobRoutes = require('./Routes/Job')

app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/job', jobRoutes)

mongoose.connect(process.env.CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('Database Connected')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
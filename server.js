const express = require('express')
const app = express()

require('dotenv').config()

let dbConnect = require('./dbConnect')

app.use(express.json())

app.get("/", (req, res) => {
  res.json({message: "Hello world!"})
})

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
  console.log(`Server is up and running on port: ${PORT}`)
})
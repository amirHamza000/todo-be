require('dotenv').config();
const express = require('express')
const app = express()
const todoHandler = require('../routeHandler/todoHandler')
const port = 3000
require("../config/db")

app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is a simple ToDo app')
})

app.use("/todo", todoHandler);

app.listen(port, () => {
  console.log(`ToDo app running on port ${port}`)
})
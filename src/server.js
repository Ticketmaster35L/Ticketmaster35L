const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const database = require('./database.js')
const logindata = require('./logindata.js')

app.use(express.urlencoded());
app.use(express.json())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/ticket/*', (req, res) => {
  res.send(database.getTicket(req.url.substring(8)))
});

app.post('/ticket/*', (req, res) => {
  database.updateTicket(req.url.substring(8), req.body)
  res.send("Success")
});

app.post('/create_ticket', (req, res) => {
  id = database.createTicket(req.body)
  res.send({ id: id })
});

// User data
app.get('/user/*', (req, res) => {
  res.send(logindata.getUser(req.url.substring(8)))
});

app.post('/user/*', (req, res) => {
  logindata.updateUser(req.url.substring(8), req.body)
  res.send("Success")
});

app.post('/create_user', (req, res) => {
  id = logindata.createUser(req.body)
  res.send({ id: id })
});
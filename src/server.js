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

const bcrypt = require('bcrypt');

// POST route to register a user
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  password = password.reverse()
  bcrypt.hash(username, saltRounds,
      function(err, hashedPassword) {
          if (err) {
              console.error(err)
          }
          else {
              password = hashedPassword;
          }
      });
  logindata.createUser({email: email, password: password})
  res.send({ id: id });
});

app.get('/validate', (req, res) => {
  const { email, password } = req.body;
  password = password.reverse()
  const user = logindata.getUserByEmail(email)
  if (user)
  {
    bcrypt.compare(password, user.password, function(err, same) {
      if (err) {
        res.status(501).send("Error comparing passwords: " + err)
        console.error(err);
      } else {
        if (same)
          res.send({ id: user.id });
        else
          res.status(501).send("Invalid password for: " + email)
      }
    });
  }
  else {
    res.status(500).send("Could not find email: " + email)
  }
})
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const database = require('./database.js')
const logindata = require('./logindata.js')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/ticket/*', (req, res) => {
  res.send(database.getTicket(req.url.substring(8)))
});

app.post('/ticket/*', (req, res) => {
  database.updateTicket(req.url.substring(8), req.body)
  res.send({ id: req.url.substring(8) })
});

app.get('/all_tickets', (req, res) => {
  res.send({ tickets: database.getAllTickets() })
})

app.post('/create_ticket', (req, res) => {
  id = database.createTicket(req.body)
  res.send({ id: id })
});

// User data
app.get('/user/*', (req, res) => {
  res.send(logindata.getUser(req.url.substring(6)))
});

app.post('/user/*', (req, res) => {
  if (req.body.password) {
    const saltRounds = 10
    req.body.password = req.body.password.split("").reverse().join("");
    bcrypt.hash(req.body.password, saltRounds,
      function (err, hashedPassword) {
        if (err) {
          console.error(err)
        }
        else {
          logindata.updateUser(req.url.substring(6), { ...req.body, password: hashedPassword })
        }
      });
  }
  else {
    logindata.updateUser(req.url.substring(6), req.body)
  }
  res.send({ id: req.url.substring(6) })
});

app.get('/all_users', (req, res) => {
  res.send({ users: logindata.getAllUsers() })
})

app.post('/create_user', (req, res) => {
  id = logindata.createUser(req.body)
  res.send({ id: id })
});

const bcrypt = require('bcrypt');

// POST route to register a user
app.post('/register', (req, res) => {
  const saltRounds = 10
  let { name, email, password } = req.body;
  password = password.split("").reverse().join("");
  const user = logindata.getUserByEmail(email)
  if (user && !user.err)
    res.status(500).send("Email already in database")
  else {
    bcrypt.hash(password, saltRounds,
      function (err, hashedPassword) {
        if (err) {
          console.error(err)
        }
        else {
          logindata.createUser({ name: name, email: email, password: hashedPassword })
          res.send({ id: id });
        }
      });
  }
});

app.post('/validate', (req, res) => {
  let { email, password } = req.body;
  password = password.split("").reverse().join("");
  const user = logindata.getUserByEmail(email)
  if (user && !user.err) {
    bcrypt.compare(password, user.password, function (err, same) {
      if (err) {
        res.status(500).send("Error comparing passwords: " + err)
        console.error(err);
      } else {
        if (same)
          res.send({ id: user.id });
        else
          res.status(500).send("Invalid password for: " + email)
      }
    });
  }
  else {
    res.status(500).send("Could not find email: " + email)
  }
})
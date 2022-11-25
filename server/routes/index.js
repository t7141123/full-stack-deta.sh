const express = require('express');
const router = express.Router();
const users = require('../model/users');

// Check session validation and redirect to login
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) res.status(400).send('You are not logged in!');
  else next();
};

router.post('/login', (req, res) => {
  // enter your code here
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    const user = users.find(
      (el) => el.email === email && el.password === password
    );
    if (user) {
      req.session.userId = user.id;
      res.status(200).json({ id: user.id, name: user.name });
    } else res.status(401).send('Wrong email or password');
  } else res.status(400).send('Login failed');
});

router.get('/logout', redirectLogin, (req, res) => {
  // enter your code here
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  res.redirect('/');
});

router.post('/register', (req, res) => {
  // enter your code here
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (email && password && name) {
    if (users.find((el) => el.email === email)) {
      res.status(409).send('E-Mail already registered');
    } else {
      const id = Math.max(...users.map((el) => el.id)) + 1;
      users.push({
        id: id,
        name: name,
        email: email,
        password: password,
      });
      res.status(200).send('OK');
    }
  } else res.status(400).send('Login failed');
});

router.get('/secretdata', redirectLogin, (req, res) => {
  // enter your code here
  return res.status(200).end('the prime number is 2305843009213693951');
});

router.get('/test', redirectLogin, (req, res) => {
  // enter your code here
  return res.status(200).end('test~');
});

module.exports = router;

const express = require('express');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const session = require('express-session');
const history = require('connect-history-api-fallback');

require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(history());
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

// let { PORT, NODE_ENV, SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET } =
//   process.env;

// Register middleware for express sessions here
app.use(
  session({
    secret: 'secretKey',
    name: 'cookie',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 10,
      httpOnly: false,
      sameSite: true,
      secure: true,
    },
  })
);

app.use('/', routes);
app.use(errorHandler);
app.listen(3000);

// export 'app'
module.exports = app;

// (A) INITIALIZE
// (A1) LOAD REQUIRED MODULES
// npm i bcryptjs express body-parser cookie-parser multer jsonwebtoken
const bcrypt = require('bcryptjs'),
  path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  multer = require('multer'),
  jwt = require('jsonwebtoken'),
  http = require('http');

// (A2) EXPRESS + MIDDLEWARE
const app = express();
app.use(multer().array());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// (B) USER ACCOUNTS - AT LEAST ENCRYPT YOUR PASSWORDS!
// bcrypt.hash("PASSWORD", 8, (err, hash) => { console.log(hash); });
const users = {
  'al@action-lead.com': '$2a$08$lD0aNdfWYsnB85gRdt7/q.WrvS.uZwPNAJdTCxs1YaDTrDEvCNlo2', // 123
};

// (C) JSON WEB TOKEN
// (C1) SETTINGS - CHANGE TO YOUR OWN!
const jwtKey = 'secret',
  jwtIss = 'actionlead',
  jwtAud = 'site.com',
  jwtAlgo = 'HS512';

// (C2) GENERATE JWT TOKEN
jwtSign = (email) => {
  // RANDOM TOKEN ID
  let char =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&_-',
    rnd = '';
  for (let i = 0; i < 16; i++) {
    rnd += char.charAt(Math.floor(Math.random() * char.length));
  }

  // UNIX NOW
  let now = Math.floor(Date.now() / 1000);

  // SIGN TOKEN
  return jwt.sign(
    {
      iat: now, // ISSUED AT - TIME WHEN TOKEN IS GENERATED
      nbf: now, // NOT BEFORE - WHEN THIS TOKEN IS CONSIDERED VALID
      exp: now + 3600, // EXPIRY - 1 HR (3600 SECS) FROM NOW IN THIS EXAMPLE
      jti: rnd,
      iss: jwtIss, // ISSUER
      aud: jwtAud, // AUDIENCE
      // WHATEVER ELSE YOU WANT TO PUT
      data: { email: email },
    },
    jwtKey,
    { algorithm: jwtAlgo }
  );
};

// (C3) VERIFY TOKEN
jwtVerify = (cookies) => {
  if (cookies.JWT === undefined) {
    return false;
  }
  try {
    let decoded = jwt.verify(cookies.JWT, jwtKey);
    // DO WHATEVER EXTRA CHECKS YOU WANT WITH DECODED TOKEN
    // console.log(decoded);
    return true;
  } catch (err) {
    return false;
  }
};

// (D) EXPRESS HTTP
// (D1) STATIC ASSETS
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// (D2) HOME PAGE - OPEN TO ALL
app.get('/', (req, res) => {
  console.log(req.cookies);
  if (jwtVerify(req.cookies)) {
    res.sendFile(path.join(__dirname, '/admin.html'));
  } else {
    res.redirect('../login');
  }
});

// (D3) ADMIN PAGE - REGISTERED USERS ONLY
app.get('/admin', (req, res) => {
  if (jwtVerify(req.cookies)) {
    res.sendFile(path.join(__dirname, '/admin.html'));
  } else {
    res.redirect('../login');
  }
});

// (D4) LOGIN PAGE
app.get('/login', (req, res) => {
  if (jwtVerify(req.cookies)) {
    res.redirect('../admin');
  } else {
    res.sendFile(path.join(__dirname, '/login.html'));
  }
});

// (D5) LOGIN ENDPOINT
app.post('/in', async (req, res) => {
  let pass = users[req.body.email] !== undefined;
  if (pass) {
    pass = await bcrypt.compare(req.body.password, users[req.body.email]);
  }
  if (pass) {
    res.cookie('JWT', jwtSign(req.body.email));
    res.status(200);
    res.send('OK');
  } else {
    res.status(200);
    res.send('Invalid user/password');
  }
});

// (D6) LOGOUT ENDPOINT
app.post('/out', (req, res) => {
  res.clearCookie();
  res.status(200);
  res.send('OK');
});

// (E) GO!
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(8443);

// var httpServer = http.createServer(app);
// httpServer.listen(8080);

// export 'app'
module.exports = app;
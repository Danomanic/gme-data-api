require('dotenv').config();

const express = require('express');

const app = express();

const routes = require('./routes');

const { log } = console;

const PORT = process.env.PORT || 3000;

const auth = (req, res, next) => {
  if (req.headers.authkey !== null && req.headers.authkey === process.env.AUTHKEY) {
    next();
  } else {
    res.sendStatus(403);
  }
};

app.use(auth);
app.use('/', routes);
app.listen(PORT, () => log(`API Running on: ${PORT}`));

require('dotenv').config();

const express = require('express');

const app = express();

const routes = require('./routes');

const { log } = console;

app.use('/', routes);

const PORT = 3000;

app.listen(PORT, () => log(`API Running on: ${PORT}`));

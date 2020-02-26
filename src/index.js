require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/', routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

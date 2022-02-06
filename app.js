global.Promise = require('bluebird');
const express = require('express');

const config = require('./config');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use((req, res, next) => {
  req.state = {};
  return next();
});

router(app);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log('App running!');
});

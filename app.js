const express = require('express');

const router = require('./routes');

const app = express();

app.use((req, res, next) => {
  req.state = {};
  return next();
});

router(app);

app.listen(3000, () => {
  console.log('App running!');
});

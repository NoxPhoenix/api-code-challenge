module.exports = (err, req, res, next) => {
  res.set('Content-Type', 'application/json');
  console.warn(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: err.message || 'Request Failed' });
  next();
};

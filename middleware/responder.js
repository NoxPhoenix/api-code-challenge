const xssFilters = require('xss-filters');

const sanitizeData = (data) => JSON.parse(xssFilters.inHTMLData(JSON.stringify(data)));

const responder = (req, res) => {
  res.set('Content-Type', 'application/json');
  const sanitizedResponse = sanitizeData(req.state.body);
  res.send({ data: sanitizedResponse });
};

module.exports = responder;

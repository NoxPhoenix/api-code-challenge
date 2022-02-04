const xssFilters = require('xss-filters');

const sanitizeData = (data) => JSON.parse(xssFilters.inHTMLData(JSON.stringify(data)))

const responder = (req, res) => {
  res.set('Content-Type', 'application/json');
  const sanitizedResponse = sanitizeData(req.state.body);
  console.log(sanitizedResponse);
  res.send(sanitizedResponse);
};

module.exports = responder;
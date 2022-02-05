module.exports = {
  additionalProperties: false,
  required: [
    'title',
    'number',
    'state',
  ],
  properties: {
    title: {
      type: 'string',
    },
    number: {
      type: 'number',
    },
    state: {
      type: 'string',
    },
    numberOfCommits: {
      type: 'number',
    },
  },
};

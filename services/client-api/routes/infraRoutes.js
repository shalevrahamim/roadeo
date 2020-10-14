const version = process.env.API_VERSION || 'unknown';

module.exports = (app) => {
  app.get('/version', (req, res) => {
    res.json({ version });
  });
};

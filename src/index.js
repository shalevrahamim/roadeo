const startServer = async () => {
  const port = process.env.PORT || 1337;
  return port;
};

module.exports = () => {
  startServer()
    .then((port) => {
      const server = require('./app');
      server().listen(port, () => {
        console.log(`API is live and running on port: ${port}`);
      });
    })
    .catch((error) => {
      console.error('failed to start server', error);
      throw error;
    });
};

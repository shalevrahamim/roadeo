const {
  initDb,
  models,
  getSequelize,
  getConnectionString,
} = require('../infrastructure/db');

(async () => {
  await initDb();
})();

async function init() {
  console.log(`Initializing database...`);
  await initDb();
}

try {
  init();
} catch (error) {
  console.error(error);
}

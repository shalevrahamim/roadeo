const { exec } = require('child_process');
const { initConfig, deleteConfig } = require('./configManager');

async function startMigration() {
  await initConfig();
}

startMigration()
  .then(() => {
    let modifier = '';
    if (process.env.UNDO_TO && process.env.UNDO_TO.length > 0) {
      modifier = `:undo:all ---to ${process.env.UNDO_TO}`;
    } else if (process.env.UNDO_LATEST && process.env.UNDO_LATEST !== 'false') {
      modifier = ':undo';
    } else if (process.env.UNDO_ALL && process.env.UNDO_ALL !== 'false') {
      modifier = ':undo:all';
    }

    console.log(
      `Running migration for env= ${process.env.NODE_ENV}, with modifier = ${modifier}`
    );
    exec(
      `npx sequelize db:migrate${modifier} --migrations-path './infrastructure/db/migrate/migrations'`,
      (err, stdout, stderr) => {
        deleteConfig();
        console.log(`output ${stdout}`);
        if (err) {
          console.error(`exec error: ${err}, ${stderr}`);
        }
      }
    );
  })
  .catch((error) => {
    console.log('Error runnning migration job', error);
    process.exit(1);
  });

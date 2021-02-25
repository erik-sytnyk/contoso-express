import dbInit from '../database/database';
const db = dbInit.init();

import seeder from '../database/seeders/seederDefault';

async function syncDb() {
  try {
    await db.sequelize.sync({force: true});

    await seeder.seedData(db);
  } catch (err) {
    console.log(err);
  }
}

syncDb();

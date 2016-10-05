import dbInit from '../database/database';
const db = dbInit.init();

import seeder from '../database/seeders/seederDefault';

db.sequelize.sync({force: true})
    .then(() => {
        return seeder.seedData(db);
    });
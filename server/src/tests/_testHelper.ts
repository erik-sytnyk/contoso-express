import seeder from '../database/seeders/seederDefault';
import * as Promise from 'bluebird';
import pathHelper from '../helpers/pathHelper';

const dbPath = pathHelper.getDataRelative('db', 'test.db');

import dbInit from '../database/database';
const db = dbInit.init(dbPath);

let dbIsInitialized = false;

export default {
    initTestDb
};

function initTestDb() {
    if (dbIsInitialized) return Promise.resolve(db);
    
    return db.sequelize.sync({force: true})
        .then(() => {
            return seeder.seedData(db);
        })
        .then(() => {
            dbIsInitialized = true;
            return db;
        })
        .catch((err) => {
            console.log(err);
        });
}
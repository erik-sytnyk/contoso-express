import {DbModels} from '../../typings/app/models';
import config from '../config';
const Sequelize = require('sequelize');
const models = require('./models/index');

interface Db {
    sequelize: any,
    models: DbModels
}

interface DbConnectionOptions {
    dbPath?: string,
    dbName?: string
}

export default {
    init: init
};

function init(connectionOptions?: DbConnectionOptions): Db {
    const sequelize = getConnection(connectionOptions);
    const dbModels = models.init(sequelize);

    return {
        sequelize,
        models: dbModels
    };
}

function getConnection(connectionOptions: DbConnectionOptions) {
    let options = {
        dialect: 'postgres',
        host: config.db.host,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        //logging: console.log
        logging: false,
    };

    return new Sequelize(config.db.dbName, config.db.username, config.db.password, options);
}
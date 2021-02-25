import config from '../config';
import pathHelper from '../helpers/pathHelper';
import {Sequelize} from 'sequelize';
const models = require('./models/index');

import {UserModel} from '../typings/models/UserModel';
import {EventModel} from '../typings/models/EventModel';
import {UserEventModel} from '../typings/models/UserEventModel';
import {EventFeedbackModel} from '../typings/models/EventFeedbackModel';
import {EventHistoryModel} from '../typings/models/EventHistoryModel';

interface Db {
  sequelize: any;
  models: {
    User: UserModel;
    Event: EventModel;
    UserEvent: UserEventModel;
    EventFeedback: EventFeedbackModel;
    EventHistory: EventHistoryModel;
  };
}

interface DbConnectionOptions {
  dbPath?: string;
  dbName?: string;
}

export default {
  init
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
  let options: any = {
    dialect: config.db.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    },
    //logging: console.log
    logging: false
  };

  if (config.db.connectionString) {
    return new Sequelize(config.db.connectionString, options);
  }

  if (config.db.dialect === 'sqlite') {
    options.storage = pathHelper.getLocalRelative(`./${config.db.name}.db`);
  } else {
    options.host = config.db.host;
    if (config.db.port) options.port = config.db.port;
  }

  return new Sequelize(config.db.name, config.db.username, config.db.password, options);
}

import pathHelper from './helpers/pathHelper';
import configBuilder from './helpers/configHelper';

let config = {
  appName: '',
  isDevLocal: process.env.NODE_ENV !== 'production',
  logErrors: true,
  rootUrl: 'http://localhost:3500',
  port: 3500,
  db: {
    connectionString: '',
    dialect: 'sqlite',
    host: 'localhost',
    port: 0,
    name: 'contoso',
    username: '',
    password: '',
    seedOnStart: true
  },
  web: {
    sessionSecret: ''
  },
  email: {
    fromNoReply: ''
  },
  auth: {
    useAuth: true,
    google: {
      clientID: '',
      clientSecret: ''
    },
    facebook: {
      clientID: '',
      clientSecret: ''
    }
  },
  format: {
    date: '',
    year: '',
    currencySymbol: ''
  }
};

//define ENV VARs which override all other values if defined
let envVars = {
  db: {
    connectionString: 'DB_CONNECTION_STRING'
  }
};

configBuilder.addJsonFile(config, pathHelper.getDataRelative('config.json'), true);

configBuilder.addJsonFile(config, pathHelper.getLocalRelative('config.local.json'));

configBuilder.loadEnvVars(config, envVars);

if (config.isDevLocal) {
  configBuilder.printConfig(config);
}

export default config;

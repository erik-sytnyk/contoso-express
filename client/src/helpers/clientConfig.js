function loadConfig() {
  let configData = require('../config/config.json');

  configData.isDevLocal = process.env.NODE_ENV === 'development';

  return configData;
}

let configValues = loadConfig();

export default configValues;

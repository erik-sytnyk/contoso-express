import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as stripJsonComments from 'strip-json-comments';

export default {
  addJsonFile,
  loadEnvVars,
  printConfig
};

function addJsonFile(config, path, required = false) {
  try {
    let fileVal = fs.readFileSync(path, {encoding: 'utf8'});

    let fileJson = JSON.parse(stripJsonComments(fileVal));

    _.merge(config, fileJson);
  } catch (err) {
    if (required) {
      throw new Error(`Cannot read config file from ${path}`);
    }
  }
}

function loadEnvVars(config, envVars) {
  loadEnvVarsValues(config, envVars, []);
}

function loadEnvVarsValues(config, envVars, path) {
  _.forOwn(envVars, (value, key) => {
    if (_.isString(value)) {
      let newPath = _.clone(path);
      newPath.push(key);

      loadEnvVarValue(config, newPath, value);
    } else if (_.isObject(value)) {
      let newPath = _.clone(path);
      newPath.push(key);

      loadEnvVarsValues(config, value, newPath);
    } else {
      throw new Error('Unsupported ENV VARS mapping structure'); //TODO
    }
  });
}

function loadEnvVarValue(config, path, envVar) {
  if (process.env[envVar]) {
    _.set(config, path, process.env[envVar]);
  }
}

function printConfig(config) {
  console.log('App configuration:');
  console.log(JSON.stringify(config, null, 2));
}

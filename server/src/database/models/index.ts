'use strict';

import * as _ from 'lodash';
const Sequelize = require('sequelize');

const models = [
  require('./course'),
  require('./department'),
  require('./enrollment'),
  require('./instructor'),
  require('./officeAssignment'),
  require('./student'),
  require('./user')
];

module.exports = {
  init: initModels
};

function initModels(sequelize) {
  let result = {};

  _.forEach(models, modelInit => {
    let model = modelInit.init(sequelize, Sequelize);
    result[_.upperFirst(model.name)] = model;
  });

  _.forEach(_.keys(result), modelName => {
    if (result[modelName].associate) {
      result[modelName].associate(result);
    }
  });

  return result;
}

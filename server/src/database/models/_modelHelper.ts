import * as _ from 'lodash';

export default {
  getName: getDbName,
  defineForeignKey,
  defineModel
};

function getDbName(name) {
  return _.upperFirst(name);
}

function defineForeignKey(name) {
  return {
    name: name,
    field: getDbName(name)
  };
}

function defineModel(name: string, fields, sequelize) {
  let options = {
    freezeTableName: true,
    tableName: null
  };

  options.tableName = getDbName(name);

  _.forEach(_.keys(fields), fieldKey => {
    fields[fieldKey].field = getDbName(fieldKey);
  });

  return sequelize.define(name, fields, options);
}

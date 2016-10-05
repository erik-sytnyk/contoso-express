import * as _ from 'lodash';

const settings = {
    pluralTableNames: true
};

export default {
    getName: getDbName,
    defineForeignKey,
    defineModel
};

function getDbName(name) {
    return _.snakeCase(name);
}

function defineForeignKey(name) {
    return {
        name: name,
        field: getDbName(name)
    };
}

function defineModel(name: string, fields, options, sequelize) {
    if (!options) options = {};

    if (!options.tableName) {
        let tableName = name;

        if (settings.pluralTableNames) {
            //the same way it is done in sequelize
            tableName = sequelize.Utils.inflection.pluralize(name);
        }

        tableName = getDbName(tableName);

        options.tableName = tableName;
    }

    _.forEach(_.keys(fields), (fieldKey) => {
        fields[fieldKey].field = getDbName(fieldKey);
    });

    return sequelize.define(name, fields, options);
}
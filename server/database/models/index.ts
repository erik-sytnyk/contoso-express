'use strict';

import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

module.exports = {
    init: initModels
};

function initModels(sequelize) {
    let result = {};

    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) &&
                (file !== basename) &&
                (file.slice(-3) === '.js');
        })
        .forEach(function(file) {
            //skip helper file
            if (_.startsWith(file, '_')) return true;

            let model = sequelize['import'](path.join(__dirname, file));

            result[_.upperFirst(model.name)] = model;
        });

    Object.keys(result).forEach(function(modelName) {
        if (result[modelName].associate) {
            result[modelName].associate(result);
        }
    });

    return result;
}

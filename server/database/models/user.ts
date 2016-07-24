import helper from './_modelHelper';
const bcrypt = require('bcrypt-nodejs');

export function init(sequelize, DataTypes) {
    let fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.JSON //local, google, facebook
        }
    };

    let options = {
        classMethods: {
            generateHash(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
        },
        instanceMethods: {
            getFullName() {
                return `${this.lastName}, ${this.firstName}`;
            }
        }
    };

    let model = helper.defineModel('user', fields, options, sequelize);

    return model;
}
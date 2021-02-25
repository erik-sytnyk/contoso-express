import helper from '../modelHelper';
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

  let model = helper.defineModel('user', fields, sequelize);

  model.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  model.getFullName = () => {
    return `${this.lastName}, ${this.firstName}`;
  };

  return model;
}

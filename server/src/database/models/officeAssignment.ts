import helper from './_modelHelper';

export function init(sequelize, DataTypes) {
  let fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      type: DataTypes.STRING
    }
  };

  let model = helper.defineModel('officeAssignment', fields, sequelize);

  model.associate = models => {
    model.belongsTo(models.Instructor, {
      foreignKey: helper.defineForeignKey('instructorId')
    });
  };

  return model;
}

import helper from '../modelHelper';

export function init(sequelize, DataTypes) {
  let fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    budget: {
      type: DataTypes.DECIMAL
    },
    startDate: {
      type: DataTypes.DATE
    }
  };

  let model = helper.defineModel('department', fields, sequelize);

  model.associate = models => {
    model.hasMany(models.Course, {
      foreignKey: helper.defineForeignKey('departmentId')
    });

    model.belongsTo(models.Instructor, {
      foreignKey: helper.defineForeignKey('instructorId')
    });
  };

  return model;
}

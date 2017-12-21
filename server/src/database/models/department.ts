import helper from './_modelHelper';

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

  let options = {
    classMethods: {
      associate(models) {
        model.hasMany(models.Course, {
          foreignKey: helper.defineForeignKey('departmentId')
        });
        model.belongsTo(models.Instructor, {
          foreignKey: helper.defineForeignKey('instructorId')
        });
      }
    }
  };

  let model = helper.defineModel('department', fields, options, sequelize);

  return model;
}

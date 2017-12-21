import helper from './_modelHelper';

export function init(sequelize, DataTypes) {
  let fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    credits: {
      type: DataTypes.INTEGER
    }
  };

  let options = {
    classMethods: {
      associate(models) {
        model.belongsToMany(models.Instructor, {
          through: helper.getName('courseInstructor'),
          foreignKey: helper.defineForeignKey('courseId')
        });
        model.hasMany(models.Enrollment, {
          foreignKey: helper.defineForeignKey('courseId')
        });
        model.belongsTo(models.Department, {
          foreignKey: helper.defineForeignKey('departmentId')
        });
      }
    }
  };

  let model = helper.defineModel('course', fields, options, sequelize);

  return model;
}

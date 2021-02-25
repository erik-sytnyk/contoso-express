import helper from '../modelHelper';

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

  let model = helper.defineModel('course', fields, sequelize);

  model.associate = models => {
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
  };

  return model;
}

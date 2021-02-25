import helper from '../modelHelper';

export function init(sequelize, DataTypes) {
  let fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    grade: {
      type: DataTypes.STRING
    }
  };

  let model = helper.defineModel('enrollment', fields, sequelize);

  model.associate = models => {
    model.belongsTo(models.Student, {
      foreignKey: helper.defineForeignKey('studentId')
    });

    model.belongsTo(models.Course, {
      foreignKey: helper.defineForeignKey('courseId')
    });
  };

  return model;
}

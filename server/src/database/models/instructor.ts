import helper from '../modelHelper';

export function init(sequelize, DataTypes) {
  let fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    hireDate: {
      type: DataTypes.DATE
    }
  };

  let model = helper.defineModel('instructor', fields, sequelize);

  model.associate = models => {
    model.belongsToMany(models.Course, {
      through: helper.getName('courseInstructor'),
      foreignKey: helper.defineForeignKey('instructorId')
    });

    model.hasOne(models.OfficeAssignment, {
      foreignKey: helper.defineForeignKey('instructorId')
    });
  };

  model.getFullName = () => {
    return `${this.lastName}, ${this.firstName}`;
  };

  return model;
}

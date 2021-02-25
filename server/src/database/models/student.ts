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
    enrollmentDate: {
      type: DataTypes.DATE
    }
  };

  let model = helper.defineModel('student', fields, sequelize);

  model.associate = models => {
    model.hasMany(models.Enrollment, {
      foreignKey: helper.defineForeignKey('studentId')
    });
  };

  model.getFullName = () => {
    return `${this.lastName}, ${this.firstName}`;
  };

  return model;
}

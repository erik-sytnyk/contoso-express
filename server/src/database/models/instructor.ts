import helper from './_modelHelper';

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

  let options = {
    classMethods: {
      associate: function(models) {
        model.belongsToMany(models.Course, {
          through: helper.getName('courseInstructor'),
          foreignKey: helper.defineForeignKey('instructorId')
        });
        model.hasOne(models.OfficeAssignment, {
          foreignKey: helper.defineForeignKey('instructorId')
        });
      }
    },
    instanceMethods: {
      getFullName() {
        return `${this.lastName}, ${this.firstName}`;
      }
    }
  };

  let model = helper.defineModel('instructor', fields, options, sequelize);

  return model;
}

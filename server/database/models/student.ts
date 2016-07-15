import helper from './_modelHelper';

export default Student;

function Student(sequelize, DataTypes) {
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

    let options = {
        classMethods: {
            associate: function(models) {
                model.hasMany(models.Enrollment, {
                    foreignKey: helper.defineForeignKey('studentId')
                });
            }
        },
        instanceMethods: {
            getFullName() {
                return `${this.lastName}, ${this.firstName}`;
            }
        }
    };

    let model = helper.defineModel('student', fields, options, sequelize);

    return model;
}
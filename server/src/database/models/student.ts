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
        enrollmentDate: {
            type: DataTypes.DATE
        },
        userId: {
            type: DataTypes.INTEGER
        }
    };

    let options = {
        classMethods: {
            associate(models) {
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
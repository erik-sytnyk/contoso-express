import helper from './_modelHelper';

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

    let options = {
        classMethods: {
            associate(models) {
                model.belongsTo(models.Student, {
                    foreignKey: helper.defineForeignKey('studentId')
                });
                model.belongsTo(models.Course, {
                    foreignKey: helper.defineForeignKey('courseId')
                });
            }
        }
    };

    let model = helper.defineModel('enrollment', fields, options, sequelize);

    return model;
}
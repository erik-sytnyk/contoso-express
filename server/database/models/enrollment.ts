import helper from './_modelHelper';

export default Enrollment;

function Enrollment(sequelize, DataTypes) {
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
            associate: function(models) {
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
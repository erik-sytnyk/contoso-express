import * as _ from 'lodash';
import * as Promise from 'bluebird';
import path from '../../helpers/pathHelper';
import * as moment from 'moment';
import config from '../../config';

export default {
    seedData
};

async function seedData(db) {
    let seedPath = path.getDataRelative('seed/seedData.json');
    let seedData = require(seedPath);

    await seedUsers(db, seedData.users);

    await seedInstructors(db, seedData.instructors);

    await seedOfficeAssignments(db, seedData.officeAssignments);

    await seedDepartments(db, seedData.departments);

    await seedCourses(db, seedData.courses);

    await seedStudents(db, seedData.students);

    await seedEnrollments(db, seedData.enrollments);

    await postImportRoutine(db);
    
    console.log('DB was seeded!');
}

function seedUsers(db, usersData) {
    return Promise.resolve(usersData)
        .map((user) => {
            return db.models.User.create(user);
        });
}

function seedDepartments(db, departmentsData) {
    return Promise.resolve(departmentsData)
        .map((department: any) => {
            department.startDate = parseDate(department.startDate);
            
            return db.models.Department.create(department);
        });
}

function seedCourses(db, coursesData) {
    return Promise.resolve(coursesData)
        .map((course: any) => {
            return db.models.Course.create(course)
                .then((courseModel) => {
                    courseModel.setInstructors(course.instructorsIds);
                });
        });
}

function seedStudents(db, studentsData) {
    return Promise.resolve(studentsData)
        .map((student) => {
            return db.models.Student.create(student);
        });
}

function seedEnrollments(db, enrollmentsData) {
    return Promise.resolve(enrollmentsData)
        .map((enrollment: any) => {
            enrollment.enrollmentDate = parseDate(enrollment.enrollmentDate);

            return db.models.Enrollment.create(enrollment);
        });
}

function seedInstructors(db, instructorsData) {
    return Promise.resolve(instructorsData)
        .map((instructor: any) => {
            instructor.hireDate = parseDate(instructor.hireDate);

            return db.models.Instructor.create(instructor);
        });
}

function seedOfficeAssignments(db, officeAssignmentsData) {
    return Promise.resolve(officeAssignmentsData)
        .map((officeAssignment) => {
            return db.models.OfficeAssignment.create(officeAssignment);
        });
}

function parseDate(dateStr) {
    return moment(dateStr, config.format.date).toDate();
}

function postImportRoutine(db) {
    if (db.sequelize.dialect.name === 'postgres') {
        return Promise.resolve(_.toArray(db.models))
            .map(model => {
                return updatePostgresSequence(model, db);
            });
    }

    return Promise.resolve(null);
}

function updatePostgresSequence(model, db) {
    let tableName = model.tableName;
    let idField = model.autoIncrementField;
    let sql = `SELECT setval('${tableName}_id_seq', (SELECT MAX(${idField}) FROM ${tableName}));`;
    return db.sequelize.query(sql);
}

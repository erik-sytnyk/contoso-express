import * as _ from 'lodash';
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

async function seedUsers(db, usersData) {
  for (let user of usersData) {
    await db.models.User.create(user);
  }
}

async function seedDepartments(db, departmentsData) {
  for (let department of departmentsData) {
    department.startDate = parseDate(department.startDate);

    await db.models.Department.create(department);
  }
}

async function seedCourses(db, coursesData) {
  for (let course of coursesData) {
    let courseModel = await db.models.Course.create(course);

    await courseModel.setInstructors(course.instructorsIds);
  }
}

async function seedStudents(db, studentsData) {
  for (let student of studentsData) {
    await db.models.Student.create(student);
  }
}

async function seedEnrollments(db, enrollmentsData) {
  for (let enrollment of enrollmentsData) {
    enrollment.enrollmentDate = parseDate(enrollment.enrollmentDate);

    await db.models.Enrollment.create(enrollment);
  }
}

async function seedInstructors(db, instructorsData) {
  for (let instructor of instructorsData) {
    instructor.hireDate = parseDate(instructor.hireDate);

    await db.models.Instructor.create(instructor);
  }
}

async function seedOfficeAssignments(db, officeAssignmentsData) {
  for (let officeAssignment of officeAssignmentsData) {
    await db.models.OfficeAssignment.create(officeAssignment);
  }
}

function parseDate(dateStr) {
  return moment(dateStr, config.format.date).toDate();
}

async function postImportRoutine(db) {
  if (db.sequelize.dialect.name === 'postgres') {
    return await _.toArray(db.models).map(model => {
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

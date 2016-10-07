import dbInit from '../database/database';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import {Instructor} from '../../typings/app/models';
import AppError from '../appError';

export default {
    init,
    getInstructors,
    getInstructorById,
    updateInstructor,
    addInstructor,
    deleteInstructor
};

const db = dbInit.init();
let instructorModel = db.models.Instructor;
let courseModel = db.models.Course;
let departmentModel = db.models.Department;
let officeAssignmentModel = db.models.OfficeAssignment;

function init(db) {
    instructorModel = db.models.Instructor;
    courseModel = db.models.Course;
    departmentModel = db.models.Department;
    officeAssignmentModel = db.models.OfficeAssignment;
}

function getInstructors(): Promise<Instructor[]> {
    let instructors: any = [];

    return instructorModel.findAll({
            include: [
                //include Course with Department
                {
                    model: courseModel, include: [departmentModel]
                },
                officeAssignmentModel
            ]
        });
}

function getInstructorById(id): Promise<Instructor> {
    let options = {
        include: [
            {
                model: courseModel, include: [departmentModel]
            },
            officeAssignmentModel
        ]
    };

    return instructorModel.findById(id, options);
}

function updateInstructor(instructorData): Promise<Instructor> {
    return instructorModel.findById(instructorData.id)
        .then((instructor) => {
            if (!instructor) throw new AppError('app', 'instructor_not_found');

            if (instructor.userId !== instructorData.userId) throw new AppError('app', 'user_validation');

            instructor.firstName = instructorData.firstName;
            instructor.lastName = instructorData.lastName;
            instructor.hireDate = instructorData.hireDate;

            db.sequelize.transaction(tr => {
                let options = {transaction: tr};
                let coursesIds = _.map(instructorData.courses, c => (c as any).id);

                return Promise.all([
                    instructor.save(options),
                    instructor.setCourses(coursesIds, options)
                ]);
            });
            
            return instructor.save();
        });
}

function addInstructor(instructorData): Promise<Instructor> {
    return instructorModel.create(instructorData)
        .then((instructor) => {
            let coursesIds = _.map(instructorData.courses, c => (c as any).id);

            instructor.setCourses(coursesIds);
            
            return instructor.save();
        });
}

function deleteInstructor(id, userId): Promise<Instructor> {
    return instructorModel.findById(id)
        .then((instructor) => {
            if (!instructor) throw new AppError('app', 'instructor_not_found');

            if (instructor.userId !== userId) throw new AppError('app', 'user_validation');

            return instructor.destroy();
        });
}
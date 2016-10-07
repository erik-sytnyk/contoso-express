import helper from './_testHelper';
import courseRepository from '../repositories/courseRepository';
import {expect} from 'chai';

describe('Course Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                courseRepository.init(db);
                done();
            });
    });

    describe('Courses', () => {
        it('get all', (done) => {
            return courseRepository.getCourses(null)
                .then((courses) => {
                    expect(courses).not.to.be.null;
                    expect(courses).to.be.have.length(7);
                    expect(courses[0]).to.have.property('number');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by department id', (done) => {
            let departmentId = 4;

            return courseRepository.getCourses(departmentId)
                .then((courses) => {
                    expect(courses).not.to.be.null;
                    expect(courses).to.have.length(2);
                    expect(courses[1].title).to.be.equal('Macroeconomics');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Course', () => {
        it('create', (done) => {
            let course = {
                number: 1000,
                title: 'Test course',
                credits: 5,
                departmentId: 4,
                userId: 188
            };

            return courseRepository.addCourse(course)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.number).to.be.equal(course.number);
                    expect(data.title).to.be.equal(course.title);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update', (done) => {
            let course = {
                id: 8,
                number: 1001,
                title: 'Test course updated',
                credits: 2,
                departmentId: 3,
                userId: 188
            };

            return courseRepository.updateCourse(course)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.number).to.be.equal(course.number);
                    expect(data.title).to.be.equal(course.title);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by id', (done) => {
            return courseRepository.getCourseById(8)
                .then((course) => {
                    expect(course).not.to.be.null;
                    expect(course.number).to.be.equal(1001);
                    expect(course.title).to.be.equal('Test course updated');
                    expect(course.department).not.to.be.null;
                    expect(course.department.name).to.be.equal('Engineering');
                    expect(course.department.id).to.be.equal(3);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('delete', (done) => {
            return courseRepository.deleteCourse(8, 188)
                .then((data) => {
                    expect(data).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });
});
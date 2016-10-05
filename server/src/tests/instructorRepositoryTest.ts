import helper from './_testHelper';
import instructorRepository from '../repositories/instructorRepository';
import {expect} from 'chai';

describe('Instructor Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                instructorRepository.init(db);
                done();
            });
    });

    describe('Instructors', () => {
        it('get all', (done) => {
            return instructorRepository.getInstructors()
                .then((instructors) => {
                    expect(instructors).not.to.be.null;
                    expect(instructors).to.have.length(5);
                    expect(instructors[0]).to.have.property('firstName');
                    expect(instructors[0].courses.length).to.be.greaterThan(0);
                    expect(instructors[0].courses[0].department).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Instructor', () => {
        it('create', (done) => {
            let instructor = {
                firstName: 'Test name',
                lastName: 'Test last name',
                hireDate: '11/03/1995',
                courses: [
                    {id: 1},
                    {id: 2}
                ]
            };

            return instructorRepository.addInstructor(instructor)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.firstName).to.be.equal(instructor.firstName);
                    expect(data.lastName).to.be.equal(instructor.lastName);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update', (done) => {
            let instructor = {
                id: 6,
                firstName: 'Name updated',
                lastName: 'Last name updated',
                hireDate: '11/03/2015',
                courses: [
                    {id: 2},
                    {id: 3}
                ]
            };

            return instructorRepository.updateInstructor(instructor)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.firstName).to.be.equal(instructor.firstName);
                    expect(data.lastName).to.be.equal(instructor.lastName);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by id', (done) => {
            return instructorRepository.getInstructorById(6)
                .then((instructor) => {
                    expect(instructor).not.to.be.null;
                    expect(instructor.firstName).to.be.equal('Name updated');
                    expect(instructor.courses).to.have.length(2);
                    expect(instructor.courses[0].department).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('delete', (done) => {
            return instructorRepository.deleteInstructor(6)
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
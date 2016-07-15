import helper from './_testHelper';
import studentRepository from '../repositories/studentRepository';
import {expect} from 'chai';

describe('Student Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                studentRepository.init(db);
                done();
            });
    });

    describe('Students', () => {
        it('get all', (done) => {
            let search = '';
            let sortOrder = '';
            let pageNumber = 1;
            let pageSize = 9;
            
            return studentRepository.getStudents(search, sortOrder, pageNumber, pageSize)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.count).to.be.equal(8);
                    expect(data.rows).to.have.length(8);
                    expect(data.rows[0]).to.have.property('firstName');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get statistics', (done) => {
            return studentRepository.getStudentStatistics()
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data).to.have.length(5);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Student', () => {
        it('create', (done) => {
            let student = {
                firstName: 'Test name',
                lastName: 'Test last name',
                enrollmentDate: '11/03/1995'
            };

            return studentRepository.addStudent(student)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.firstName).to.be.equal(student.firstName);
                    expect(data.lastName).to.be.equal(student.lastName);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update', (done) => {
            let student = {
                id: 9,
                firstName: 'Name updated',
                lastName: 'Last name updated',
                enrollmentDate: '11/03/2015'
            };

            return studentRepository.updateStudent(student)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.firstName).to.be.equal(data.firstName);
                    expect(data.lastName).to.be.equal(data.lastName);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by id', (done) => {
            return studentRepository.getStudentById(9)
                .then((student) => {
                    expect(student).not.to.be.null;
                    expect(student.firstName).to.be.equal('Name updated');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('delete', (done) => {
            return studentRepository.deleteStudent(9)
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
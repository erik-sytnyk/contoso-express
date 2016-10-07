import helper from './_testHelper';
import departmentRepository from '../repositories/departmentRepository';
import {expect} from 'chai';

describe('Department Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                departmentRepository.init(db);
                done();
            });
    });

    describe('Departments', () => {
        it('get all', (done) => {
            return departmentRepository.getDepartments()
                .then((departments) => {
                    expect(departments).not.to.be.null;
                    expect(departments).to.have.length(4);
                    expect(departments[0].name).to.be.equal('English');
                    expect(departments[0].instructor).not.to.be.null;
                    expect(departments[0].instructor.firstName).to.be.equal('Kim');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Department', () => {
        it('create', (done) => {
            let department = {
                name: 'Test Department',
                budget: 100000,
                startDate: '09/01/2007',
                instructorId: 2,
                userId: 188
            };

            return departmentRepository.addDepartment(department)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.name).to.be.equal(department.name);
                    expect(data.budget).to.be.equal(department.budget.toString());
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update', (done) => {
            let department = {
                id: 5,
                name: 'Test Department updated',
                budget: 100001.00,
                startDate: '10/01/2007',
                instructorId: 3,
                userId: 188
            };

            return departmentRepository.updateDepartment(department)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.name).to.be.equal(department.name);
                    expect(data.budget).to.be.equal(department.budget);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by id', (done) => {
            return departmentRepository.getDepartmentById(5)
                .then((department) => {
                    expect(department).not.to.be.null;
                    expect(department.name).to.be.equal('Test Department updated');
                    expect(department.instructor).not.to.be.null;
                    expect(department.instructor.firstName).to.be.equal('Roger');
                    expect(department.instructor.lastName).to.be.equal('Harui');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('delete', (done) => {
            return departmentRepository.deleteDepartment(5, 188)
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
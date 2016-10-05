import helper from './_testHelper';
import officeAssignmentRepository from '../repositories/officeAssignmentRepository';
import {expect} from 'chai';

describe('Office Assignment Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                officeAssignmentRepository.init(db);
                done();
            });
    });

    describe('Office Assignment', () => {
        it('create', (done) => {
            let officeAssignment = {
                location: 'Test Location'
            };
            let instructorId = 5;

            return officeAssignmentRepository.saveOfficeAssignment(officeAssignment, instructorId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.location).to.be.equal(officeAssignment.location);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update', (done) => {
            let officeAssignment = {
                location: 'Test Location Updated'
            };
            let instructorId = 5;

            return officeAssignmentRepository.saveOfficeAssignment(officeAssignment, instructorId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.location).to.be.equal(officeAssignment.location);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('delete', (done) => {
            let instructorId = 5;

            return officeAssignmentRepository.deleteOfficeAssignmentByInstructorId(instructorId)
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
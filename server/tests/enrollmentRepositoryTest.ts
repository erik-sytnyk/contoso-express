import helper from './_testHelper';
import enrollmentRepository from '../repositories/enrollmentRepository';
import {expect} from 'chai';

describe('Enrollment Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                enrollmentRepository.init(db);
                done();
            });
    });

    describe('Enrollments', () => {
        it('get by course id', (done) => {
            let courseId = 2;

            return enrollmentRepository.getEnrollmentsByCourseId(courseId)
                .then((enrollments) => {
                    expect(enrollments).not.to.be.null;
                    expect(enrollments).to.have.length(3);
                    expect(enrollments[0].student).not.to.be.null;
                    expect(enrollments[0].student).to.have.property('firstName');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });
});
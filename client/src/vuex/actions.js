import helper from '../helpers/uiHelper';
import dateFormatter from '../formatters/dateFormatter';
import types from './mutationTypes';
import _ from 'lodash';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import departmentService from '../services/departmentService';
import instructorService from '../services/instructorService';
import enrollmentService from '../services/enrollmentService';

//student actions

export const loadStudentsStatistics = (store) => {
    const {dispatch, state} = store;

    return studentService.getStudentsStatistics()
        .then(statistics => {
            dispatch(types.LOAD_STUDENTS_STATISTICS, statistics);
        }).catch(error => {
            throw(error);
        });
};

export const loadStudents = (store) => {
    const {dispatch, state} = store;

    let studentsState = state.students;

    return studentService.getStudents(studentsState.search, studentsState.sortOrder, studentsState.pageNumber, studentsState.pageSize)
        .then(data => {
            dispatch(types.LOAD_STUDENTS, data.rows);
            dispatch(types.COUNT_STUDENTS, data.count);
        }).catch(error => {
            throw(error);
        });
};

export const deleteStudent = (store, studentId) => {
    return studentService.deleteStudent(studentId)
        .then(() => {
            helper.showMessage(`Student was removed successfully`);
            loadStudents(store);
        }).catch(error => {
            throw(error);
        });
};

export const loadStudent = (store, studentId) => {
    const {dispatch, state} = store;

    let action = Promise.resolve(null);

    if (_.isNumber(studentId)) {
        action = studentService.getStudent(studentId);
    }

    return action
        .then(student => {
            if (!student) {
                student = {
                    firstName: '',
                    lastName: '',
                    enrollmentDate: dateFormatter.currentDate()
                };
            }

            store.dispatch(types.LOAD_STUDENT, student);
        })
        .catch(error => {
            throw(error);
        });
};

export const saveStudent = (store, student) => {
    return studentService.saveStudent(student)
        .then(() => {
            let message = student.id ? 'Student was updated successfully' : 'Student was added successfully';
            helper.showMessage(message);
            loadStudents(store);
        });
};

export const changePage = (store, newPageNumber) => {
    store.dispatch(types.CHANGE_PAGE, newPageNumber);
};

export const searchStudents = (store, searchString) => {
    store.dispatch(types.SEARCH_STUDENTS, searchString);
    store.dispatch(types.CHANGE_PAGE, 1);

    loadStudents(store);
};

export const changeSortOrder = (store, sortOrder) => {
    store.dispatch(types.CHANGE_SORT_ORDER, sortOrder);

    loadStudents(store);
};

//course actions

export const loadCourses = (store) => {
    const {dispatch, state} = store;
    
    return courseService.getCourses(state.courses.departmentId)
        .then(courses => {
            dispatch(types.LOAD_COURSES, courses);
        }).catch(error => {
            throw(error);
        });
    
};

export const deleteCourse = (store, courseId) => {
    return courseService.deleteCourse(courseId)
        .then(() => {
            helper.showMessage(`Course was removed successfully`);
            loadCourses(store);
        }).catch(error => {
            throw(error);
        });
};

export const loadCourse = (store, courseId) => {
    const {dispatch, state} = store;

    let action = Promise.resolve(null);

    if (_.isNumber(courseId)) {
        action = courseService.getCourse(courseId);
    }

    return action
        .then(course => {
            if (!course) {
                course = {
                    number: '',
                    title: '',
                    credits: '',
                    departmentId: '',
                    department: {name: ''}
                };
            }

            store.dispatch(types.LOAD_COURSE, course);
        })
        .catch(error => {
            throw(error);
        });
};

export const saveCourse = (store, course) => {
    return courseService.saveCourse(course)
        .then(() => {
            let message = course.id ? 'Course was updated successfully' : 'Course was added successfully';
            helper.showMessage(message);
            loadCourses(store);
        });
};

export const changeSelectedDepartment = (store, departmentId) => {
    store.dispatch(types.CHANGE_SELECTED_DEPARTMENT, departmentId);
};

//instructor actions

export const loadInstructors = (store) => {
    const {dispatch, state} = store;

    return instructorService.getInstructors()
        .then(instructors => {
            dispatch(types.LOAD_INSTRUCTORS, instructors);
        }).catch(error => {
            throw(error);
        });

};

export const loadInstructor = (store, instructorId) => {
    const {dispatch, state} = store;

    let action = Promise.resolve(null);

    if (_.isNumber(instructorId)) {
        action = instructorService.getInstructor(instructorId);
    }

    return action
        .then(instructor => {
            if (!instructor) {
                instructor = {
                    firstName: '',
                    lastName: '',
                    hireDate: dateFormatter.currentDate(),
                    officeAssignment: {
                        location: ''
                    },
                    courses: []
                };
            } else {
                if (!instructor.officeAssignment) {
                    instructor.officeAssignment = {
                        location: ''
                    };
                }
            }

            dispatch(types.LOAD_INSTRUCTOR, instructor);
        })
        .catch(error => {
            throw(error);
        });
};

export const deleteInstructor = (store, instructorId) => {
    return instructorService.deleteInstructor(instructorId)
        .then(() => {
            helper.showMessage(`Instructor was removed successfully`);
            loadInstructors(store);
        }).catch(error => {
            throw(error);
        });
};

export const saveInstructor = (store, instructor, selectedCourses) => {
    instructor.courses = [];
    
    _.forEach(selectedCourses, (course) => {
        instructor.courses.push({id: course});
    });

    return instructorService.saveInstructor(instructor)
        .then(() => {
            let message = instructor.id ? 'Instructor was updated successfully' : 'Instructor was added successfully';
            helper.showMessage(message);
            loadInstructors(store);
        });
};

//enrollment actions

export const loadEnrollments = (store, courseId) => {
    const {dispatch, state} = store;
    
    return enrollmentService.getEnrollments(courseId)
        .then(enrollments => {
            dispatch(types.LOAD_ENROLLMENTS, enrollments);
        }).catch(error => {
            throw(error);
        });
};

//departments actions

export const loadDepartments = (store) => {
    const {dispatch, state} = store;

    return departmentService.getDepartments()
        .then(departments => {
            dispatch(types.LOAD_DEPARTMENTS, departments);
        }).catch(error => {
            throw(error);
        });
};

export const deleteDepartment = (store, departmentId) => {
    return departmentService.deleteDepartment(departmentId)
        .then(() => {
            helper.showMessage(`Department was removed successfully`);
            loadDepartments(store);
        }).catch(error => {
            throw(error);
        });
};

export const loadDepartment = (store, departmentId) => {
    const {dispatch, state} = store;

    let action = Promise.resolve(null);

    if (_.isNumber(departmentId)) {
        action = departmentService.getDepartment(departmentId);
    }

    return action
        .then(department => {
            if (!department) {
                department = {
                    name: '',
                    budget: '',
                    startDate: dateFormatter.currentDate(),
                    instructorId: '',
                    Instructor: {lastName: '', firstName: ''}
                };
            }

            dispatch(types.LOAD_DEPARTMENT, department);
        })
        .catch(error => {
            throw(error);
        });
};

export const saveDepartment = (store, department) => {
    return departmentService.saveDepartment(department)
        .then(() => {
            let message = department.id ? 'Department was updated successfully' : 'Department was added successfully';
            helper.showMessage(message);
            loadDepartments(store);
        });
};
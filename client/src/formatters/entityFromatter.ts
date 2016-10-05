export function instructorSelectListItem(instructors) {
    return instructors.map(instructor => {
        return {
            value: instructor.id,
            text: instructor.lastName + ', ' + instructor.firstName
        };
    });
}

export function courseSelectListItem(courses) {
    return courses.map(course => {
        return {
            value: course.id,
            text: course.number + ' ' + course.title
        };
    });
}

export function departmentSelectListItem(departments) {
    return departments.map(department => {
        return {
            value: department.id,
            text: department.name
        };
    });
}

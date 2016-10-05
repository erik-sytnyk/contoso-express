//TODO use some Model interfaces
export interface DbModels {
    User: any,
    Course: any,
    Department: any,
    Enrollment: any,
    Instructor: any,
    OfficeAssignment: any,
    Student: any
}

export interface User {
    id: number,
    email: string,
    profile: {
        local?: LocalProfile,
        google?: GoogleProfile
    },
    getFullName(): string,
    save(): any
}

export interface LocalProfile {
    password: boolean,
    isActivated: boolean,
    activation: {
        created: string,
        token: string
    }
    reset: {
        created: string,
        token: string
    }
}

export interface GoogleProfile {
    id: number,
    token: string,
    name: string,
    email: string
}

export interface Course {
    id: number,
    number: number,
    title: string,
    credits: number,
    department?: Department
}

export interface Department {
    id: number,
    name: string,
    budget: number,
    startDate: Date,
    instructor?: Instructor
}

export interface Enrollment {
    id: number,
    grade: string,
    student?: Student
}

export interface Instructor {
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    hireDate: Date,
    courses?: Course[]
    getFullName(): string
}

export interface OfficeAssignment {
    id: number,
    location: string,
    instructorId: number
}

export interface Student {
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    enrollmentDate: Date,
    getFullName(): string
}
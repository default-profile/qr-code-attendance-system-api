"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create admin user
        yield prisma.user.create({
            data: {
                name: 'Admin User',
                email: 'admin@attendance.com',
                username: 'admin',
                password: 'admin',
                role: 'admin',
            },
        });
        // Create teacher
        yield prisma.user.create({
            data: {
                name: 'Teacher User',
                email: 'teacher@attendance.com',
                username: 'teacher',
                password: 'teacher',
                role: 'teacher',
                teacher: { create: {} },
            },
        });
        // Create students
        yield createStudents();
        // Log
        const totalUsers = yield prisma.user.count();
        console.log(`Total ${totalUsers} users add to the database`);
    });
})();
//#region User
function createUsers(noOfUsers) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < noOfUsers; i++) {
            yield createUserWithRandomData();
        }
    });
}
function createUserWithRandomData() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = ['admin', 'student', 'teacher'];
        const name = faker_1.faker.name.fullName();
        const email = faker_1.faker.internet.email();
        const username = faker_1.faker.internet.userName();
        const password = faker_1.faker.internet.password();
        // const role = roles[Math.floor(Math.random() * roles.length)];
        const role = roles[0];
        return yield createUserFromData({ name, email, username, password, role });
    });
}
function createUserFromData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({ data });
        console.log(`User with id: '${user.id}' added to the database`);
        return user;
    });
}
//#endregion
//#region Student
function createStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = new Map();
        const engineeringBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
        courses.set('BE', { branches: engineeringBranches, semestersCount: 8 });
        // const polyBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
        // courses.set('Poly', { branches: polyBranches, semestersCount: 6 });
        const oddOrEven = Math.round(Math.random());
        for (const course of courses.keys()) {
            const branches = courses.get(course).branches;
            const semestersCount = courses.get(course).semestersCount;
            for (const branch of branches) {
                if (branch === 'General') {
                    const year = `${withOrdinal(1)} Year`;
                    const semester = `${withOrdinal(2 - oddOrEven)} Semester`;
                    const studentsCount = 120;
                    for (let index = 1; index <= studentsCount; index++) {
                        const dateOfBirth = faker_1.faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
                        const firstName = faker_1.faker.name.firstName();
                        const lastname = faker_1.faker.name.lastName();
                        const name = `${firstName} ${lastname}`;
                        const email = faker_1.faker.internet.email(firstName, lastname);
                        const rollNo = `${index}`;
                        const maxIdCount = 9999999;
                        const studentId = `TBE${Math.floor(Math.random() * maxIdCount)
                            .toString()
                            .padStart(maxIdCount.toString().length, '0')}`;
                        yield createStudentFromData({ course, year, semester, branch, rollNo, studentId, name, email, dateOfBirth });
                    }
                }
                else {
                    for (let index = 2; index <= Math.ceil(semestersCount / 2); index++) {
                        const year = `${withOrdinal(index)} Year`;
                        const semester = `${withOrdinal(index * 2 - oddOrEven)} Semester`;
                        const studentsCount = 60;
                        for (let index = 1; index <= studentsCount; index++) {
                            const dateOfBirth = faker_1.faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
                            const firstName = faker_1.faker.name.firstName();
                            const lastname = faker_1.faker.name.lastName();
                            const name = `${firstName} ${lastname}`;
                            const email = faker_1.faker.internet.email(firstName, lastname);
                            const rollNo = `${index}`;
                            const maxIdCount = 9999999;
                            const studentId = `TBE${Math.floor(Math.random() * maxIdCount)
                                .toString()
                                .padStart(maxIdCount.toString().length, '0')}`;
                            yield createStudentFromData({
                                course,
                                year,
                                semester,
                                branch,
                                rollNo,
                                studentId,
                                name,
                                email,
                                dateOfBirth,
                            });
                        }
                    }
                }
            }
        }
    });
}
function createStudentWithRandomData() {
    return __awaiter(this, void 0, void 0, function* () {
        // const courses = ['BE', 'Poly'];
        const courses = new Map();
        const engineeringBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
        courses.set('BE', { branches: engineeringBranches, semestersCount: 8 });
        const polyBranches = ['General', 'CSE', 'Mechanical', 'Civil'];
        courses.set('Poly', { branches: polyBranches, semestersCount: 6 });
        const randomIndex = Math.floor(Math.random() * courses.size);
        const randomKey = [...courses.keys()][randomIndex];
        const randomCourse = courses.get(randomKey);
        const course = randomKey.toString();
        const branch = randomCourse.branches[Math.floor(Math.random() * randomCourse.branches.length)].toString();
        const semester = Math.floor(Math.random() * randomCourse.semestersCount).toString();
        const year = Math.ceil(Number(semester) / 2).toString();
        const rollNo = Math.floor(Math.random() * 60).toString();
        const dateOfBirth = faker_1.faker.date.birthdate({ min: 21, max: 25, mode: 'age' }).toISOString().split('T')[0];
        const firstName = faker_1.faker.name.firstName();
        const lastname = faker_1.faker.name.lastName();
        const name = `${firstName} ${lastname}`;
        const email = faker_1.faker.internet.email(firstName, lastname);
        const studentId = `TBE${Math.floor(Math.random() * 99999)
            .toString()
            .padStart(5)}`;
        return yield createStudentFromData({ branch, course, semester, year, rollNo, studentId, name, email, dateOfBirth });
    });
}
function createStudentFromData(_a) {
    var { name, email } = _a, data = __rest(_a, ["name", "email"]);
    return __awaiter(this, void 0, void 0, function* () {
        const { student } = yield prisma.user.create({
            data: {
                name,
                email,
                username: data.studentId,
                password: data.dateOfBirth,
                role: 'student',
                student: { create: data },
            },
            include: { student: true },
        });
        console.log(`Student with id: '${student.id}' added to the database`);
        return student;
    });
}
//#endregion
//#region Teacher
function createTeacherFromData(_a) {
    var { name, email } = _a, data = __rest(_a, ["name", "email"]);
    return __awaiter(this, void 0, void 0, function* () {
        const { teacher } = yield prisma.user.create({
            data: {
                name,
                email,
                username: email,
                password: `${name.split('s')[0]}@1234`,
                role: 'student',
                teacher: { create: data },
            },
            include: { teacher: true },
        });
        console.log(`Teacher with id: '${teacher.id}' added to the database`);
        return teacher;
    });
}
//#endregion
function withOrdinal(num) {
    switch (num) {
        case 1:
            return `${num}st`;
        case 2:
            return `${num}nd`;
        case 3:
            return `${num}rd`;
        default:
            return `${num}th`;
    }
}

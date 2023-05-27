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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudentRegisterCredentials = exports.validateLoginCredentials = exports.registerStudent = exports.loginStudent = exports.loginTeacher = exports.loginAdmin = exports.getStudent = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const ApplicationError_1 = __importDefault(require("../utils/ApplicationError"));
const prisma = new client_1.PrismaClient();
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = yield prisma.user.findUniqueOrThrow({ where: { id: res.locals.user.id } }), { password } = _a, user = __rest(_a, ["password"]);
        res.json({ status: 'success', data: user });
    });
}
exports.getUser = getUser;
function getStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = yield prisma.user.findUniqueOrThrow({
            where: { id: res.locals.user.id },
            include: { student: true },
        }), { username, password, student } = _a, user = __rest(_a, ["username", "password", "student"]);
        res.json({ status: 'success', data: Object.assign(Object.assign({}, user), student) });
    });
}
exports.getStudent = getStudent;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get login credentials from request body
        const { username, password } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        // Retrieve user from database if doesn't exist return null
        const userOrNull = yield prisma.user.findUnique({ where: { username: username } });
        // Throw invalid credentials error if user doesn't exist or role & password doesn't match
        if (!userOrNull || userOrNull.role !== 'admin' || userOrNull.password !== password)
            throw new ApplicationError_1.default('Invalid username or password', 400);
        // Remove password from user & sign jwt with user as payload
        const { password: _ } = userOrNull, user = __rest(userOrNull, ["password"]);
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
        res.json({ status: 'success', data: { user, token } });
    });
}
exports.loginAdmin = loginAdmin;
function loginTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get login credentials from request body
        const { username, password } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        // Retrieve user from database if doesn't exist return null
        const userOrNull = yield prisma.user.findUnique({ where: { username: username }, include: { teacher: true } });
        // Throw invalid credentials error if user doesn't exist or role & password doesn't match
        if (!userOrNull || userOrNull.role !== 'teacher' || userOrNull.password !== password)
            throw new ApplicationError_1.default('Invalid username or password', 400);
        // Remove password from user & sign jwt with user as payload
        const { password: _, teacher } = userOrNull, user = __rest(userOrNull, ["password", "teacher"]);
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
        res.json({ status: 'success', data: { user, teacher, token } });
    });
}
exports.loginTeacher = loginTeacher;
function loginStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get login credentials from request body
        const { username, password } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        // Retrieve user from database if doesn't exist return null
        const userOrNull = yield prisma.user.findUnique({ where: { username: username }, include: { student: true } });
        // Throw invalid credentials error if user doesn't exist or role & password doesn't match
        if (!userOrNull || userOrNull.role !== 'student' || userOrNull.password !== password)
            throw new ApplicationError_1.default('Invalid username or password', 400);
        // Remove password from user & sign jwt with user as payload
        const { password: _, student } = userOrNull, user = __rest(userOrNull, ["password", "student"]);
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
        res.json({ status: 'success', data: { user, student, token } });
    });
}
exports.loginStudent = loginStudent;
function registerStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get student details from request body
        const _a = (0, express_validator_1.matchedData)(req, { locations: ['body'] }), { name, email, username, password } = _a, studentDetails = __rest(_a, ["name", "email", "username", "password"]);
        // Create user whose role is `student`
        const _b = yield prisma.user.create({
            data: {
                name,
                email,
                username,
                password,
                role: 'student',
                student: { create: studentDetails },
            },
        }), { password: _ } = _b, user = __rest(_b, ["password"]);
        // Sign jwt with user as payload
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
        res.json({ status: 'success', data: { user, token } });
    });
}
exports.registerStudent = registerStudent;
exports.validateLoginCredentials = [
    (0, express_validator_1.body)('username').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('password').exists({ checkNull: true, checkFalsy: true }).isString(),
    validate_middleware_1.default,
];
exports.validateStudentRegisterCredentials = [
    (0, express_validator_1.body)('name').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('email').exists({ checkNull: true, checkFalsy: true }).isEmail(),
    (0, express_validator_1.body)('username').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('password').exists({ checkNull: true, checkFalsy: true }).isStrongPassword(),
    (0, express_validator_1.body)('studentId').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('course').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('year').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('semester').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('branch').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('rollNo').exists({ checkNull: true, checkFalsy: true }).isString(),
    validate_middleware_1.default,
];

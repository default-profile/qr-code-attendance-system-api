"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminOrTeacher = exports.requireAdminOrStudent = exports.requireTeacher = exports.requireStudent = exports.requireAdmin = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ForbiddenError_1 = __importDefault(require("../utils/ForbiddenError"));
const UnauthorizedError_1 = __importDefault(require("../utils/UnauthorizedError"));
function requireAuth(req, res, next) {
    // Check for authorization header
    const auth = req.headers.authorization;
    if (!auth)
        throw new UnauthorizedError_1.default();
    // Extract & verify token
    const token = auth.split(' ')[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
    }
    catch (_a) {
        throw new UnauthorizedError_1.default();
    }
    next();
}
exports.requireAuth = requireAuth;
function requireAdmin(req, res, next) {
    requireAuth(req, res, () => { });
    if (res.locals.user.role === 'admin')
        next();
    else
        throw new ForbiddenError_1.default();
}
exports.requireAdmin = requireAdmin;
function requireStudent(req, res, next) {
    requireAuth(req, res, () => { });
    if (res.locals.user.role === 'student')
        next();
    else
        throw new ForbiddenError_1.default();
}
exports.requireStudent = requireStudent;
function requireTeacher(req, res, next) {
    requireAuth(req, res, () => { });
    if (res.locals.user.role === 'teacher')
        next();
    else
        throw new ForbiddenError_1.default();
}
exports.requireTeacher = requireTeacher;
function requireAdminOrStudent(req, res, next) {
    requireAuth(req, res, () => { });
    if (res.locals.user.role === 'admin' || res.locals.user.role === 'student')
        next();
    else
        throw new ForbiddenError_1.default();
}
exports.requireAdminOrStudent = requireAdminOrStudent;
function requireAdminOrTeacher(req, res, next) {
    requireAuth(req, res, () => { });
    if (res.locals.user.role === 'admin' || res.locals.user.role === 'teacher')
        next();
    else
        throw new ForbiddenError_1.default();
}
exports.requireAdminOrTeacher = requireAdminOrTeacher;

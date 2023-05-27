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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudent = exports.deleteStudent = exports.updateStudent = exports.getStudent = exports.createStudent = exports.getStudents = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const prisma = new client_1.PrismaClient();
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _limit, _skip, _sort, _order } = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
        const query = req.query;
        const total = yield prisma.student.count();
        const items = yield prisma.student.findMany({
            skip: _skip,
            take: _limit,
            orderBy: { [_sort]: _order },
            where: {
                AND: [
                    { id: { contains: query.id } },
                    { studentId: { contains: query.studentId } },
                    { dateOfBirth: { contains: query.dateOfBirth } },
                    { course: { contains: query.course } },
                    { year: { contains: query.year } },
                    { semester: { contains: query.semester } },
                    { branch: { contains: query.branch } },
                    { rollNo: { contains: query.rollNo } },
                ],
            },
        });
        res.json({ status: 'success', data: { total, items } });
    });
}
exports.getStudents = getStudents;
function createStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(501).json({ status: 'fail', message: 'Route not implemented' });
    });
}
exports.createStudent = createStudent;
function getStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.student.findUniqueOrThrow({ where: { id: req.params.id } });
        res.json({ status: 'success', data });
    });
}
exports.getStudent = getStudent;
function updateStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(501).json({ status: 'fail', message: 'Route not implemented' });
    });
}
exports.updateStudent = updateStudent;
function deleteStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.student.delete({ where: { id: req.params.id } });
        res.json({ status: 'success', data: {} });
    });
}
exports.deleteStudent = deleteStudent;
exports.validateStudent = [validate_middleware_1.default];

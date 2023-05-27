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
exports.validateAttendance = exports.deleteAttendance = exports.updateAttendance = exports.getAttendance = exports.createAttendance = exports.getAttendances = exports.markAttendance = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const prisma = new client_1.PrismaClient();
function markAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const attendance = yield prisma.attendance.upsert({
            where: { id: req.params.lectureId },
            create: {
                present: true,
                lecture: { connect: { id: req.params.lectureId } },
                student: { connect: { id: res.locals.user.id } },
            },
            update: {
                present: true,
                lecture: { connect: { id: req.params.lectureId } },
                student: { connect: { id: res.locals.user.id } },
            },
        });
        res.json({ status: 'success', data: attendance });
    });
}
exports.markAttendance = markAttendance;
function getAttendances(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _limit, _skip, _sort, _order } = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
        const query = req.query;
        const total = yield prisma.attendance.count();
        const items = yield prisma.attendance.findMany({
            skip: _skip,
            take: _limit,
            orderBy: { [_sort]: _order },
            where: {
                AND: [{ id: { contains: query.id } }],
            },
        });
        res.json({ status: 'success', data: { total, items } });
    });
}
exports.getAttendances = getAttendances;
function createAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(501).json({ status: 'fail', message: 'Route not implemented' });
    });
}
exports.createAttendance = createAttendance;
function getAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.attendance.findUniqueOrThrow({ where: { id: req.params.id } });
        res.json({ status: 'success', data });
    });
}
exports.getAttendance = getAttendance;
function updateAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(501).json({ status: 'fail', message: 'Route not implemented' });
    });
}
exports.updateAttendance = updateAttendance;
function deleteAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.attendance.delete({ where: { id: req.params.id } });
        res.json({ status: 'success', data: {} });
    });
}
exports.deleteAttendance = deleteAttendance;
exports.validateAttendance = [validate_middleware_1.default];

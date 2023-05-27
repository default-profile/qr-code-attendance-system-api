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
exports.validateLecture = exports.deleteLecture = exports.updateLecture = exports.getLecture = exports.createLecture = exports.getLectures = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const prisma = new client_1.PrismaClient();
function getLectures(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _limit, _skip, _sort, _order } = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
        const query = req.query;
        const total = yield prisma.lecture.count();
        const items = yield prisma.lecture.findMany({
            skip: _skip,
            take: _limit,
            orderBy: { [_sort]: _order },
            where: {
                AND: [
                    { id: { contains: query.id } },
                    { course: { contains: query.course } },
                    { year: { contains: query.year } },
                    { semester: { contains: query.semester } },
                    { branch: { contains: query.branch } },
                    { subject: { contains: query.subject } },
                    { date: { contains: query.date } },
                    { time: { contains: query.time } },
                    { duration: { contains: query.duration } },
                ],
            },
        });
        res.json({ status: 'success', data: { total, items } });
    });
}
exports.getLectures = getLectures;
function createLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lectureData = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const lecture = yield prisma.lecture.create({
            data: Object.assign(Object.assign({}, lectureData), { teacher: { connect: { id: res.locals.user.id } } }),
        });
        res.setHeader('Location', `/attendances/mark/${lecture.id}`);
        res.status(201).json({ status: 'success', data: lecture });
    });
}
exports.createLecture = createLecture;
function getLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.lecture.findUniqueOrThrow({ where: { id: req.params.id } });
        res.json({ status: 'success', data });
    });
}
exports.getLecture = getLecture;
function updateLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(501).json({ status: 'fail', message: 'Route not implemented' });
    });
}
exports.updateLecture = updateLecture;
function deleteLecture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.lecture.delete({ where: { id: req.params.id } });
        res.json({ status: 'success', data: {} });
    });
}
exports.deleteLecture = deleteLecture;
exports.validateLecture = [
    (0, express_validator_1.body)('course').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('year').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('semester').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('branch').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('subject').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('date').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('time').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('duration').exists({ checkNull: true, checkFalsy: true }).isString(),
    validate_middleware_1.default,
];

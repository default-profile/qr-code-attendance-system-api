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
exports.validateUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
const prisma = new client_1.PrismaClient();
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _limit, _skip, _sort, _order } = (0, express_validator_1.matchedData)(req, { locations: ['query'] });
        const query = req.query;
        const total = yield prisma.user.count();
        const users = yield prisma.user.findMany({
            skip: _skip,
            take: _limit,
            orderBy: { [_sort]: _order },
            where: {
                AND: [
                    { id: { contains: query.id } },
                    { name: { contains: query.name } },
                    { email: { contains: query.email } },
                    { username: { contains: query.username } },
                    { role: { contains: query.role } },
                ],
            },
        });
        // Exclude password field from users
        const items = users.map((user) => {
            const { password } = user, rest = __rest(user, ["password"]);
            return rest;
        });
        res.json({ status: 'success', data: { total, items } });
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const _a = yield prisma.user.create({ data: Object.assign(Object.assign({}, userData), { role: 'admin' }) }), { password } = _a, data = __rest(_a, ["password"]);
        res.status(201).json({ status: 'success', data });
    });
}
exports.createUser = createUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = yield prisma.user.findUniqueOrThrow({ where: { id: req.params.id } }), { password } = _a, data = __rest(_a, ["password"]);
        res.json({ status: 'success', data });
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const data = yield prisma.user.update({ where: { id: req.params.id }, data: Object.assign(Object.assign({}, userData), { role: 'admin' }) });
        res.json({ status: 'success', data });
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.delete({ where: { id: req.params.id } });
        res.json({ status: 'success', data: {} });
    });
}
exports.deleteUser = deleteUser;
// export function validateUser() {
//   return [
//     body('name').exists({ checkNull: true, checkFalsy: true }).isString(),
//     body('email').exists({ checkNull: true, checkFalsy: true }).isEmail(),
//     body('username').exists({ checkNull: true, checkFalsy: true }).isString(),
//     body('password').exists({ checkNull: true, checkFalsy: true }).isStrongPassword(),
//     validate,
//   ];
// }
exports.validateUser = [
    (0, express_validator_1.body)('name').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('email').exists({ checkNull: true, checkFalsy: true }).isEmail(),
    (0, express_validator_1.body)('username').exists({ checkNull: true, checkFalsy: true }).isString(),
    (0, express_validator_1.body)('password').exists({ checkNull: true, checkFalsy: true }).isStrongPassword(),
    validate_middleware_1.default,
];

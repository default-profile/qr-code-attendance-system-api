"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const ApplicationError_1 = __importDefault(require("../utils/ApplicationError"));
/*
In Express 4 we have to manually pass the error thrown in async function to the next function,
In Express 5 we no longer need to pass error to next function,
Unhandled promise rejections are automatically passed to error handler.
*/
function errorHandler(err, req, res, next) {
    var _a, _b;
    if (err instanceof ApplicationError_1.default) {
        res.status(err.statusCode).json({ status: 'fail', message: err.message });
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                const fields = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target;
                const field = fields[fields.length - 1];
                res.status(400).json({ status: 'fail', message: `Field '${field}' should be unique` });
                break;
            case 'P2025':
                res.status(404).json({ status: 'fail', message: ((_b = err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Resource not found' });
                break;
            default:
                res.status(400).json({ status: 'fail', message: 'Prisma known error' });
        }
    }
    else if (err instanceof library_1.PrismaClientUnknownRequestError) {
        res.status(400).json({ status: 'fail', message: 'Prisma unknown error' });
    }
    else if (err instanceof library_1.PrismaClientValidationError) {
        res.status(400).json({ status: 'fail', message: 'Prisma validation error' });
    }
    else
        res.status(500).json({ status: 'fail', message: 'An unexpected error occurred' });
    console.log(err);
}
exports.default = errorHandler;

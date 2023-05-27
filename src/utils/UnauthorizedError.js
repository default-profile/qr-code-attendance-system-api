"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = __importDefault(require("./ApplicationError"));
class UnauthorizedError extends ApplicationError_1.default {
    constructor(message) {
        super(message || 'Unauthorized', 401);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = UnauthorizedError;

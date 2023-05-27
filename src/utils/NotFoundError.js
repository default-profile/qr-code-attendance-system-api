"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = __importDefault(require("./ApplicationError"));
class NotFoundError extends ApplicationError_1.default {
    constructor(message) {
        super(message || 'Not Found', 404);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = NotFoundError;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = __importDefault(require("./ApplicationError"));
class ForbiddenError extends ApplicationError_1.default {
    constructor(message) {
        super(message || 'Forbidden', 403);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ForbiddenError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = 500;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.statusCode = statusCode || this.statusCode;
    }
}
exports.default = ApplicationError;

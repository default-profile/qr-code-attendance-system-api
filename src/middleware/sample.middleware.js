"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sampleLogger(req, res, next) {
    console.log('Hello from sample middleware');
    next();
}
exports.default = sampleLogger;

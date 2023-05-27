"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function validate(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        return next();
    const firstError = errors.array()[0];
    const message = `Invalid value for '${firstError.param}'`;
    res.status(400).json({ status: 'fail', message });
}
exports.default = validate;

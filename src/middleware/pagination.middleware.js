"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function pagination(defaultPageSize = 10) {
    return [
        (0, express_validator_1.query)('_skip').customSanitizer((value) => Math.abs(Number(value)) || 0),
        (0, express_validator_1.query)('_limit').customSanitizer((value) => Math.abs(Number(value)) || defaultPageSize),
    ];
}
exports.default = pagination;

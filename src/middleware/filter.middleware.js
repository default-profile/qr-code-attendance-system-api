"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = void 0;
exports.userFilterableFields = ['id', 'email', 'username', 'role'];
function filter(filterableFields) {
    return (req, res, next) => {
        const filters = filterableFields.map((field) => ({ [field]: { contains: req.query[field] } }));
        res.locals.filters = filters;
        next();
    };
}
exports.default = filter;

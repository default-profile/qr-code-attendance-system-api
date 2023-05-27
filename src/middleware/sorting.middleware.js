"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSortableFields = exports.LectureSortableFields = exports.StudentSortableFields = exports.TeacherSortableFields = exports.UserSortableFields = void 0;
const express_validator_1 = require("express-validator");
exports.UserSortableFields = ['id', 'email', 'username', 'role'];
exports.TeacherSortableFields = ['id', 'name'];
exports.StudentSortableFields = ['id', 'studentId', 'rollNo', 'course', 'year', 'semester', 'branch'];
exports.LectureSortableFields = ['id', 'course', 'year', 'semester', 'branch', 'subject', 'date', 'time'];
exports.AttendanceSortableFields = ['id'];
function sorting(resourceType) {
    const sortableFields = getSortableFields(resourceType);
    return [
        (0, express_validator_1.query)('_sort').customSanitizer((value) => (sortableFields.includes(value) ? value : 'id')),
        (0, express_validator_1.query)('_order').customSanitizer((value) => (['asc', 'desc'].includes(value) ? value : 'asc')),
    ];
}
function getSortableFields(resourceType) {
    switch (resourceType) {
        case 'Student':
            return exports.StudentSortableFields;
        case 'Teacher':
            return exports.TeacherSortableFields;
        case 'Lecture':
            return exports.LectureSortableFields;
        case 'Attendance':
            return exports.AttendanceSortableFields;
        default:
            return exports.UserSortableFields;
    }
}
exports.default = sorting;

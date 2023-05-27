"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendance_controllers_1 = require("../controllers/attendance.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pagination_middleware_1 = __importDefault(require("../middleware/pagination.middleware"));
const sorting_middleware_1 = __importDefault(require("../middleware/sorting.middleware"));
const attendanceRouter = express_1.default.Router();
attendanceRouter.post('/mark/:lectureId', auth_middleware_1.requireStudent, attendance_controllers_1.markAttendance);
attendanceRouter.get('/', (0, sorting_middleware_1.default)('Attendance'), (0, pagination_middleware_1.default)(), attendance_controllers_1.getAttendances);
attendanceRouter.post('/', attendance_controllers_1.validateAttendance, attendance_controllers_1.createAttendance);
attendanceRouter.get('/:id', attendance_controllers_1.getAttendance);
attendanceRouter.put('/:id', attendance_controllers_1.validateAttendance, attendance_controllers_1.updateAttendance);
attendanceRouter.delete('/:id', attendance_controllers_1.deleteAttendance);
exports.default = attendanceRouter;

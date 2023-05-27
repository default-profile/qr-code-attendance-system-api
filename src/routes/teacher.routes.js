"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controllers_1 = require("../controllers/teacher.controllers");
const pagination_middleware_1 = __importDefault(require("../middleware/pagination.middleware"));
const sorting_middleware_1 = __importDefault(require("../middleware/sorting.middleware"));
const teacherRouter = express_1.default.Router();
teacherRouter.get('/', (0, sorting_middleware_1.default)('Teacher'), (0, pagination_middleware_1.default)(), teacher_controllers_1.getTeachers);
teacherRouter.post('/', teacher_controllers_1.validateTeacher, teacher_controllers_1.createTeacher);
teacherRouter.get('/:id', teacher_controllers_1.getTeacher);
teacherRouter.put('/:id', teacher_controllers_1.validateTeacher, teacher_controllers_1.updateTeacher);
teacherRouter.delete('/:id', teacher_controllers_1.deleteTeacher);
exports.default = teacherRouter;

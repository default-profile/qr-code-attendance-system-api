"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("../controllers/student.controllers");
const sorting_middleware_1 = __importDefault(require("../middleware/sorting.middleware"));
const pagination_middleware_1 = __importDefault(require("../middleware/pagination.middleware"));
const studentRouter = express_1.default.Router();
studentRouter.get('/', (0, sorting_middleware_1.default)('Student'), (0, pagination_middleware_1.default)(), student_controllers_1.getStudents);
studentRouter.post('/', student_controllers_1.validateStudent, student_controllers_1.createStudent);
studentRouter.get('/:id', student_controllers_1.getStudent);
studentRouter.put('/:id', student_controllers_1.validateStudent, student_controllers_1.updateStudent);
studentRouter.delete('/:id', student_controllers_1.deleteStudent);
exports.default = studentRouter;

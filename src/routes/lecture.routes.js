"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lecture_controllers_1 = require("../controllers/lecture.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pagination_middleware_1 = __importDefault(require("../middleware/pagination.middleware"));
const sorting_middleware_1 = __importDefault(require("../middleware/sorting.middleware"));
const lectureRouter = express_1.default.Router();
lectureRouter.get('/', (0, sorting_middleware_1.default)('Lecture'), (0, pagination_middleware_1.default)(), lecture_controllers_1.getLectures);
lectureRouter.post('/', auth_middleware_1.requireTeacher, lecture_controllers_1.validateLecture, lecture_controllers_1.createLecture);
lectureRouter.get('/:id', lecture_controllers_1.getLecture);
lectureRouter.put('/:id', auth_middleware_1.requireTeacher, lecture_controllers_1.validateLecture, lecture_controllers_1.updateLecture);
lectureRouter.delete('/:id', lecture_controllers_1.deleteLecture);
exports.default = lectureRouter;

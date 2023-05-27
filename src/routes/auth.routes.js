"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authRouter = express_1.default.Router();
authRouter.get('/user', auth_middleware_1.requireAuth, auth_controllers_1.getUser);
authRouter.get('/student', auth_middleware_1.requireStudent, auth_controllers_1.getStudent);
authRouter.post('/login-admin', auth_controllers_1.validateLoginCredentials, auth_controllers_1.loginAdmin);
authRouter.post('/login-student', auth_controllers_1.validateLoginCredentials, auth_controllers_1.loginStudent);
authRouter.post('/login-teacher', auth_controllers_1.validateLoginCredentials, auth_controllers_1.loginTeacher);
authRouter.post('/register-student', auth_controllers_1.validateStudentRegisterCredentials, auth_controllers_1.registerStudent);
exports.default = authRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const pagination_middleware_1 = __importDefault(require("../middleware/pagination.middleware"));
const sorting_middleware_1 = __importDefault(require("../middleware/sorting.middleware"));
const userRouter = express_1.default.Router();
userRouter.get('/', (0, sorting_middleware_1.default)('User'), (0, pagination_middleware_1.default)(), user_controllers_1.getUsers);
userRouter.post('/', user_controllers_1.validateUser, user_controllers_1.createUser);
userRouter.get('/:id', user_controllers_1.getUser);
userRouter.put('/:id', user_controllers_1.validateUser, user_controllers_1.updateUser);
userRouter.delete('/:id', user_controllers_1.deleteUser);
exports.default = userRouter;

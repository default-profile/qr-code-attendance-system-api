"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const lecture_routes_1 = __importDefault(require("./routes/lecture.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// Load environment variable form .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Base route
app.get('/', (_, res) => {
    res.status(200).json({ status: 'success', data: 'Server is up & running...' });
});
// Routes
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/students', student_routes_1.default);
app.use('/teachers', teacher_routes_1.default);
app.use('/lectures', lecture_routes_1.default);
app.use('/attendances', attendance_routes_1.default);
// Not found route
// In Express 5 `(*)` is no longer valid and must be written as `(.*)`
app.all('(.*)', (_, res) => {
    res.status(404).json({ status: 'fail', message: 'Not Found' });
});
// Error handler
app.use(error_middleware_1.default);
// HTTP server
app.listen(port, () => console.log(`HTTP server is listening on port ${port}`));
// // HTTPs server option
// const options: https.ServerOptions = {
//   key: fs.readFileSync(`${__dirname}/config/cert.key`, 'utf-8'),
//   cert: fs.readFileSync(`${__dirname}/config/cert.crt`, 'utf-8'),
// };
// // HTTPs server
// https.createServer(options, app).listen(8080, () => {
//   console.log(`HTTPS server is listening on port 8080`);
// });

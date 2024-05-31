"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const post_route_1 = __importDefault(require("./routes/post-route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verify_route_1 = __importDefault(require("./routes/verify-route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Adjust this to your frontend's domain
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//RouteHandler
app.use('/api/auth', auth_routes_1.default);
app.use('/api/posts', post_route_1.default);
app.use('/api/verify', verify_route_1.default);
app.listen(8000);

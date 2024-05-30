"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default.object({
    username: zod_1.default.string().min(3, "Username must be at least 3 characters long"),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters long"),
    name: zod_1.default.string().optional(),
    profilepicture: zod_1.default.string().optional(),
});

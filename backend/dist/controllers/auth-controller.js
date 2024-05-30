"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const validation_1 = require("../utils/validation");
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = validation_1.signupValidation.safeParse(req.body);
        if (!verify.success)
            return res.status(400).json({ error: verify.error.message });
        const { username, password, profilepicture, name } = req.body;
        const checkUsername = yield db_1.default.user.findFirst({
            where: {
                username,
            },
        });
        if (checkUsername)
            return res.status(400).json({ error: "Username already taken" });
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.default.user.create({
            data: {
                username,
                password: hashPassword,
                name,
                profilepicture,
            },
        });
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return res.status(200).json({
            message: "User signed up successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const checkUser = yield db_1.default.user.findFirst({
            where: {
                username,
            },
        });
        if (!checkUser)
            return res.status(400).json({ error: "User not found" });
        const checkPassword = yield bcrypt_1.default.compare(password, checkUser.password);
        if (!checkPassword)
            return res.status(400).json({ error: "Password is Incorrect" });
        const token = jsonwebtoken_1.default.sign({ userid: checkUser.id }, process.env.SECRET || "", {
            expiresIn: "1h",
        });
        res.cookie("authToken", token);
        const { password: _ } = checkUser, userWithoutPassword = __rest(checkUser, ["password"]);
        return res
            .status(200)
            .json({
            message: "user has logged in successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signin = signin;

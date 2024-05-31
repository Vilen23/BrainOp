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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.fetchPosts = void 0;
const db_1 = __importDefault(require("../utils/db"));
const fetchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = yield db_1.default.post.findMany({
            skip,
            take: limit,
        });
        const totalPosts = yield db_1.default.post.count();
        const totalPages = Math.ceil(totalPosts / limit);
        return res.status(200).json({ page, limit, totalPages, totalPosts, posts });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchPosts = fetchPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, picture, content } = req.body;
        const user = req.user;
        if (title === "" && picture === "" && content === "")
            return res.status(400).json({ error: "Invalid Inputs" });
        const post = yield db_1.default.post.create({
            data: {
                title,
                picture,
                content,
                authorId: user.userid,
            },
        });
        if (!post)
            return res.status(400).json({ error: "Post not created" });
        return res.status(201).json(post);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createPost = createPost;

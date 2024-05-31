"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_token_1 = require("../middlewares/verify-token");
const post_controller_1 = require("../controllers/post-controller");
const router = express_1.default.Router();
router.get('/getPosts', verify_token_1.verifyToken, post_controller_1.fetchPosts);
exports.default = router;

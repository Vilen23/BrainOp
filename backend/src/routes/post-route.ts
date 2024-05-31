import express from 'express'
import { verifyToken } from '../middlewares/verify-token';
import { createPost, fetchPosts } from '../controllers/post-controller';
const router = express.Router();

router.get('/getPosts',verifyToken,fetchPosts);
router.post('/createPost',verifyToken,createPost);

export default router
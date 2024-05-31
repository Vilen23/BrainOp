import express from 'express'
import { verifyToken } from '../middlewares/verify-token';
import { fetchPosts } from '../controllers/post-controller';
const router = express.Router();

router.get('/getPosts',verifyToken,fetchPosts);

export default router
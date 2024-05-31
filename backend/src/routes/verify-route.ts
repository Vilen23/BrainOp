import express from 'express'
import { verifyToken } from '../middlewares/verify-token';
import { verifyUser } from '../controllers/verify-controller';
const router = express.Router();

router.get('/',verifyUser);

export default router;
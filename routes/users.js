import express from 'express';
import { getUsersById } from '../controllers/users.js';

const router = express.Router();

router.get('/:userId',getUsersById);

export default router;
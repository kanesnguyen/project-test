import { Router } from 'express';
import UserRouter from './Users';
import SessionsRouter from './Sessions';
import PasswordRouter from './Passwords';
import UploadRouter from './Uploaders';

const router = Router();

router.use('/users', UserRouter);
router.use('/sessions', SessionsRouter);
router.use('/passwords', PasswordRouter);
router.use('/uploaders', UploadRouter);

export default router;

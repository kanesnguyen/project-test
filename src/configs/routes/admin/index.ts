import { Router } from 'express';
import { adminPassport } from '@middlewares/passport';
import AdminRouter from './Admins';
import SessionsRouter from './Sessions';
import UserRouter from './Users';
import UploadRouter from './Uploaders';

const router = Router();

router.use('/admins', adminPassport.authenticate('jwt', { session: false }), AdminRouter);
router.use('/sessions', SessionsRouter);
router.use('/users', adminPassport.authenticate('jwt', { session: false }), UserRouter);
router.use('/uploaders', adminPassport.authenticate('jwt', { session: false }), UploadRouter);

export default router;

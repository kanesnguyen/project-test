import SessionController from '@controllers/api/admin/SessionsController';
import { Router } from 'express';
import { adminPassport } from '@middlewares/passport';

const router = Router();
/**
 * @openapi
 * /a/sessions:
 *   get:
 *     tags:
 *      - "[Admin]: Sessions"
 *     summary: Thông tin người dùng CMS
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.get('/', adminPassport.authenticate('jwt', { session: false }), SessionController.show);
/**
 * @openapi
 * /a/sessions/update:
 *   patch:
 *     tags:
 *      - "[Admin]: Sessions"
 *     summary: Cập nhật Thông tin người dùng CMS
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *              type: "string"
 *              description: "Avatar"
 *            fullName:
 *              type: "string"
 *              description: "Họ và tên"
 *            username:
 *              type: "string"
 *              description: "Username"
 *            phoneNumber:
 *              type: "string"
 *              description: "Số điện thoại"
 *            email:
 *              type: "string"
 *              description: "Email"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.patch('/update', adminPassport.authenticate('jwt', { session: false }), SessionController.update);
/**
 * @openapi
 * /a/sessions/login:
 *   post:
 *     tags:
 *      - "[Admin]: Sessions"
 *     summary: Người dùng CMS đăng nhập bằng username, mật khẩu
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            username:
 *              type: "string"
 *              description: "username"
 *            password:
 *              type: "string"
 *              description: "Mật khẩu"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.post('/login', SessionController.create);

export default router;

import PasswordsController from '@controllers/api/user/PasswordsController';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /u/password/reset_password:
 *   post:
 *     tags:
 *      - "[User]: Password"
 *     summary: Khách hàng đổi mật khẩu
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            currentPassword:
 *              type: "string"
 *              description: "Mật khẩu hiện tại"
 *            password:
 *              type: "string"
 *              description: "Mật khẩu mới"
 *            passwordConfirmation:
 *              type: "string"
 *              description: "Xác nhận Mật khẩu mới"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.post('/reset_password', PasswordsController.update);

export default router;

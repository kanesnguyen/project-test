import PasswordController from '@controllers/api/user/PasswordsController';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /u/passwords/forgot_password:
 *   post:
 *     tags:
 *      - "[User]: Passwords"
 *     summary: Khách hàng quên mật khẩu
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.post('/forgot_password', PasswordController.forgotPassword);

/**
 * @openapi
 * /u/passwords/reset_password:
 *   post:
 *     tags:
 *      - "[User]: Passwords"
 *     summary: Khách hàng đặt lại mật khẩu
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            otp:
 *              type: "string"
 *              description: "otp"
 *            email:
 *              type: "string"
 *              description: "email"
 *            password:
 *              type: "string"
 *              description: "password"
 *            passwordConfirmation:
 *              type: "string"
 *              description: "password"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.post('/reset_password', PasswordController.resetPassword);

export default router;

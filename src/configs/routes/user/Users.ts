import UsersController from '@controllers/api/user/UsersController';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /u/users:
 *   post:
 *     tags:
 *      - "[User]: Users"
 *     summary: Đăng ký khách hàng
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin khách hàng"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *              description: "Họ và tên"
 *            phoneNumber:
 *              type: "string"
 *              description: "Số điện thoại"
 *            password:
 *              type: "string"
 *              description: "Tên đăng nhập"
 *            passwordConfirmation:
 *              type: "string"
 *              description: "xác nhận mật khẩu"
 *            email:
 *              type: "string"
 *              description: "Email"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Error can't insert data.
 *     security:
 *      - Bearer: []
 */
router.post('/', UsersController.register);

export default router;

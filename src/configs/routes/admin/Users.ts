import UsersController from '@controllers/api/admin/UsersController';
import { Router } from 'express';

const router = Router();
/**
* @openapi
* /a/users/:
*   get:
*     tags:
*      - "[Admin]: Users"
*     summary: Danh sách khách hàng
*     parameters:
*      - in: query
*        name: "freeWord"
*        type: "string"
*      - in: query
*        name: "status"
*        type: "string"
*        enum:
*          - "active"
*          - "inactive"
*      - in: query
*        name: "type"
*        type: "string"
*        enum:
*          - "teacher"
*          - "student"
*          - "other"
*      - in: query
*        name: "gender"
*        type: "string"
*        enum:
*          - "male"
*          - "female"
*      - in: query
*        name: "page"
*        type: "string"
*      - in: query
*        name: "limit"
*        type: "string"
*     responses:
*       200:
*         description: Return data.
*       500:
*         description: Lỗi không xác định
*     security:
*      - Bearer: []
*/
router.get('/', UsersController.index);

/**
 * @openapi
 * /a/users/{userId}/active:
 *   patch:
 *     tags:
 *      - "[Admin]: Users"
 *     summary: Mở khóa khách hàng
 *     parameters:
 *      - in: path
 *        name: "userId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:userId/active', UsersController.active);

/**
 * @openapi
 * /a/users/{userId}/inactive:
 *   patch:
 *     tags:
 *      - "[Admin]: Users"
 *     summary: Khóa khách hàng
 *     parameters:
 *      - in: path
 *        name: "userId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:userId/inactive', UsersController.inactive);

/**
 * @openapi
 * /a/users/{userId}:
 *   get:
 *     tags:
 *      - "[Admin]: Users"
 *     summary: Chi tiết user
 *     description: Chi tiết user
 *     parameters:
 *      - in: path
 *        name: "userId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/:userId', UsersController.show);

/**
 * @openapi
 * /a/users/{userId}/reset_password:
 *   patch:
 *     tags:
 *      - "[Admin]: Users"
 *     summary: Đặt lại mật khẩu cho khách hàng
 *     parameters:
 *      - in: path
 *        name: "userId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "Mật khẩu mới"
 *            passwordConfirmation:
 *              type: "string"
 *              description: "Xác nhận Mật khẩu mới"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:userId/reset_password', UsersController.resetPassword);

export default router;

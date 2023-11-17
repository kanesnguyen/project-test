import AdminController from '@controllers/api/admin/AdminsController';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /a/admins/:
 *  post:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: Tạo người dùng CMS
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin admin"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *              type: "string"
 *            username:
 *              type: "string"
 *            phoneNumber:
 *              type: "string"
 *            fullname:
 *              type: "string"
 *            password:
 *              type: "string"
 *            email:
 *              type: "string"
 *     responses:
 *       120:
 *        description: email đã tồn tại
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.post('/', AdminController.create);

/**
 * @openapi
 * /a/admins/:
 *   get:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: danh sách admins
 *     parameters:
 *      - in: query
 *        name: "freeWord"
 *        type: "string"
 *      - in: query
 *        name: "status"
 *        type: "string"
 *        enum:
 *               - active
 *               - inactive
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/', AdminController.index);
/**
 * @openapi
 * /a/admins/{adminId}:
 *   patch:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: Cập nhật admin
 *     parameters:
 *      - in: path
 *        name: "adminId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin admin"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *             type: "string"
 *            username:
 *             type: "string"
 *            fullname:
 *             type: "string"
 *            phoneNumber:
 *             type: "string"
 *            email:
 *             type: "string"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:adminId', AdminController.update);

/**
 * @openapi
 * /a/admins/{adminId}:
 *   get:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: Chi tiết admin
 *     description: Chi tiết admin
 *     parameters:
 *      - in: path
 *        name: "adminId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "Upload success"
 *       404:
 *         description: Không tìm thấy dữ liệu
 *       500:
 *        description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.get('/:adminId', AdminController.show);

/**
  * @openapi
  * /a/admins/{adminId}:
  *   delete:
  *     tags:
  *      - "[Admin]: Admin"
  *     summary: Xóa admin
  *     parameters:
  *      - in: path
  *        name: "adminId"
  *        description: "adminId"
  *        type: "string"
  *     responses:
  *       200:
  *         description: Return data.
  *       500:
  *         description: Lỗi không xác định
  *     security:
  *      - Bearer: []
  */
router.delete('/:adminId', AdminController.delete);

/**
 * @openapi
 * /a/admins/{adminId}/active:
 *   patch:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: Cập nhật mở khóa admin
 *     parameters:
 *      - in: path
 *        name: "adminId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:adminId/active', AdminController.active);

/**
 * @openapi
 * /a/admins/{adminId}/inactive:
 *   patch:
 *     tags:
 *      - "[Admin]: Admin"
 *     summary: Cập nhật khóa admin
 *     parameters:
 *      - in: path
 *        name: "adminId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: Return data.
 *       500:
 *         description: Lỗi không xác định
 *     security:
 *      - Bearer: []
 */
router.patch('/:adminId/inactive', AdminController.inactive);

export default router;

import CommonUploaderController from '@controllers/api/user/CommonUploaderController';
import { userPassport } from '@middlewares/passport';
import { commonFileUploader } from '@middlewares/uploaders';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /u/uploaders/common:
 *   post:
 *     tags:
 *      - "[User]: Uploaders"
 *     summary: Upload file file
 *     consumes:
 *      - "multipart/form-data"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "formData"
 *        name: "files"
 *        description: "files"
 *        required: false
 *        allowMultiple: false
 *        type: "file"
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
router.post('/common', userPassport.authenticate('jwt', { session: false }), commonFileUploader.any(), CommonUploaderController.uploadFile);

/**
 * @openapi
 * /u/uploaders/common/{link}:
 *   get:
 *     tags:
 *      - "[User]: Uploaders"
 *     summary: Upload file file
 *     parameters:
 *      - in: "path"
 *        name: "link"
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
router.get('/common/:link', CommonUploaderController.show);

export default router;

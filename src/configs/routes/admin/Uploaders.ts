import CommonUploaderController from '@controllers/api/admin/CommonUploaderController';
import { commonFileUploader } from '@middlewares/uploaders';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /a/uploaders/common:
 *   post:
 *     tags:
 *      - "[Admin]: Uploaders"
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
router.post('/common', commonFileUploader.any(), CommonUploaderController.uploadFile);

export default router;

import SessionController from '@controllers/api/user/SessionsController';
import { Router } from 'express';
import { userPassport } from '@middlewares/passport';

const router = Router();
/**
 * @openapi
 * /u/sessions:
 *   get:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Thông tin người dùng cuối
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.get('/', userPassport.authenticate('jwt', { session: false }), SessionController.show);

/**
 * @openapi
 * /u/sessions/update:
 *   patch:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Cập nhật Thông tin người dùng cuối
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
 *            dateOfBirth:
 *              type: "string"
 *              description: "Ngày sinh"
 *            phoneNumber:
 *              type: "string"
 *              description: "Số điện thoại"
 *            gender:
 *              type: "string"
 *              description: "Giới tính"
 *            enum:
 *                - "male"
 *                - "female"
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.patch('/update', userPassport.authenticate('jwt', { session: false }), SessionController.update);

/**
 * @openapi
 * /u/sessions/login:
 *   post:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Khách hàng đăng nhập bằng email, mật khẩu
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
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

/**
 * @openapi
 * /u/sessions/facebook/callback:
 *   get:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Callback facebook OAuth
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.get('/facebook/callback', userPassport.authenticate('facebook', { session: false, scope: ['email'] }), SessionController.newWithFacebook);

/**
 * @openapi
 * /u/sessions/facebook:
 *   get:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Login via facebook
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.get('/facebook', userPassport.authenticate('facebook', { session: false, scope: ['email'] }));

/**
 * @openapi
 * /u/sessions/google/callback:
 *   get:
 *     tags:
 *      - "[User]: Sessions"
 *     summary: Callback google OAuth
 *     responses:
 *       200:
 *         description: Success.
 *       500:
 *         description: Internal errror.
 *     security:
 *      - Bearer: []
 */
router.get('/google/callback', userPassport.authenticate('google', { session: false, scope: ['email'] }), SessionController.newWithGoogle);

/**
  * @openapi
  * /u/sessions/google:
  *   get:
  *     tags:
  *      - "[User]: Sessions"
  *     summary: Login via google
  *     responses:
  *       200:
  *         description: Success.
  *       500:
  *         description: Internal errror.
  *     security:
  *      - Bearer: []
  */
router.get('/google', userPassport.authenticate('google', { session: false, scope: ['email'] }));

export default router;

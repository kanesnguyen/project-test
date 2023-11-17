import { BadAuthentication } from '@libs/errors';
import { sendError, sendSuccess } from '@libs/response';
import AdminModel from '@models/Admins';
import { Request, Response } from 'express';
import settings from '@configs/settings';

class SessionController {
  public async show (req: Request, res: Response) {
    try {
      const currentAdmin = req.currentAdmin;
      sendSuccess(res, { currentAdmin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const currentAdmin = req.currentAdmin;
      const params = req.parameters.permit(AdminModel.UPDATABLE_PARAMETERS).value();
      await currentAdmin.update(params);
      sendSuccess(res, { currentAdmin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async create (req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const admin = await AdminModel.scope([
        { method: ['byUsername', username] },
        { method: ['byStatus', AdminModel.STATUS_ENUM.ACTIVE] },
      ]).findOne();
      if (!admin || !(await admin.validPassword(password))) {
        return sendError(res, 404, BadAuthentication);
      }
      const accessToken = await admin.generateAccessToken();
      sendSuccess(res, { accessToken, tokenExpireAt: settings.jwt.ttl });
    } catch (error) {
      sendError(res, 500, error.message);
    }
  }
}

export default new SessionController();

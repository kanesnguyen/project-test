import { BadAuthentication } from '@libs/errors';
import { sendError, sendSuccess } from '@libs/response';
import UserModel from '@models/Users';
import { Request, Response } from 'express';
import settings from '@configs/settings';

class SessionController {
  public async show (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      sendSuccess(res, { currentUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async create (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.scope([
        { method: ['byEmail', email] },
        { method: ['byStatus', UserModel.STATUS_ENUM.ACTIVE] },
      ]).findOne();
      if (!user || !(await user.validPassword(password))) {
        return sendError(res, 404, BadAuthentication);
      }
      const accessToken = await user.generateAccessToken();
      sendSuccess(res, { accessToken, tokenExpireAt: settings.jwt.ttl });
    } catch (error) {
      sendError(res, 500, error.message);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const currentUser = req.currentUser;
      const params = req.parameters.permit(UserModel.UPDATABLE_PARAMETERS).value();
      await currentUser.update(params);
      sendSuccess(res, { currentUser });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async newWithFacebook (req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.currentUser.id);
      const accessToken = await user.generateAccessToken();
      sendSuccess(res, { accessToken, tokenExpireAt: settings.jwt.ttl });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async newWithGoogle (req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.currentUser.id);
      const accessToken = await user.generateAccessToken();
      sendSuccess(res, { accessToken, tokenExpireAt: settings.jwt.ttl });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new SessionController();

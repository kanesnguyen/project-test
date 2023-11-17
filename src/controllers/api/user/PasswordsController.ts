import { NoData, BadAuthentication } from '@libs/errors';
import { sendError, sendSuccess } from '@libs/response';
import UserModel from '@models/Users';
import { Request, Response } from 'express';

class PasswordController {
  public async forgotPassword (req:Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.scope([
        { method: ['byEmail', email] },
      ]).findOne();
      if (user) user.sendForgotPasswordOtp();
      sendSuccess(res, {});
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async resetPassword (req:Request, res:Response) {
    try {
      const { email, otp, password, passwordConfirmation } = req.body;
      const user = await UserModel.scope([
        { method: ['byEmail', email] },
      ]).findOne();
      if (!user || !user.checkValidForgotPasswordToken(otp as string)) return sendError(res, 404, NoData);
      await user.update({ password, passwordConfirmation, forgotPasswordOtp: null });
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const { currentPassword, password, passwordConfirmation } = req.body;
      const currentUser = req.currentUser;
      if (!(await currentUser.validPassword(currentPassword))) {
        return sendError(res, 404, BadAuthentication);
      }
      await currentUser.update({ password, passwordConfirmation });
      sendSuccess(res, { currentUser });
    } catch (error) {
      sendError(res, 500, error.message);
    }
  }
}

export default new PasswordController();

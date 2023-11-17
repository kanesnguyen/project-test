import { sendError, sendSuccess } from '@libs/response';
import UserModel from '@models/Users';
import { Request, Response } from 'express';

class UserController {
  public async register (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(UserModel.CREATABLE_PARAMETERS).value();
      const user = await UserModel.create(params);
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new UserController();

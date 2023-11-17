import { NoData } from '@libs/errors';
import { sendError, sendSuccess } from '@libs/response';
import settings from '@configs/settings';
import UserModel from '@models/Users';
import { Request, Response } from 'express';

class UserController {
  public async active (req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.params.userId);
      if (!user) {
        return sendError(res, 404, NoData);
      }
      await user.update({ status: UserModel.STATUS_ENUM.ACTIVE });
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async inactive (req: Request, res: Response) {
    try {
      const user = await UserModel.findByPk(req.params.userId);
      if (!user) {
        return sendError(res, 404, NoData);
      }
      await user.update({ status: UserModel.STATUS_ENUM.INACTIVE });
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status, type, gender } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      if (status) { scopes.push({ method: ['byStatus', status] }); }
      if (type) { scopes.push({ method: ['byType', type] }); }
      if (gender) { scopes.push({ method: ['byGender', gender] }); }
      const { count, rows } = await UserModel.scope(scopes).findAndCountAll({
        limit,
        offset,
      });
      sendSuccess(res, { users: rows, pagination: { total: count, page: parseInt(page), perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({ attributes: { exclude: ['password'] }, where: { id: req.params.userId } });
      if (!user) { return sendError(res, 404, NoData); }
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async resetPassword (req: Request, res: Response) {
    try {
      const { password, passwordConfirmation } = req.body;
      const user = await UserModel.findByPk(req.params.userId);
      if (!user) {
        return sendError(res, 404, NoData);
      }
      await user.update({ password, passwordConfirmation });
      sendSuccess(res, { user });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new UserController();

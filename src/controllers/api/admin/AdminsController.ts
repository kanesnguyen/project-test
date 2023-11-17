import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import AdminsModel from '@models/Admins';
import { NoData } from '@libs/errors';
import settings from '@configs/settings';
class AdminController {
  public async index (req: Request, res: Response) {
    try {
      const { freeWord, status } = req.query;
      const page = req.query.page as string || '1';
      const limit = parseInt(req.query.limit as string || settings.defaultPerPage);
      const offset = (parseInt(page, 10) - 1) * limit;
      const scopes: any = [];
      if (freeWord) { scopes.push({ method: ['byFreeWord', freeWord] }); }
      if (status) { scopes.push({ method: ['byStatus', status] }); }
      const { count, rows } = await AdminsModel.scope(scopes).findAndCountAll({
        limit,
        offset,
      });
      sendSuccess(res, { admins: rows, pagination: { total: count, page: parseInt(page), perPage: limit } });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async create (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(AdminsModel.CREATABLE_PARAMETERS).value();
      const admin = await AdminsModel.create(params);
      sendSuccess(res, { admin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async update (req: Request, res: Response) {
    try {
      const admin = await AdminsModel.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.adminId },
      });
      if (!admin) { return sendError(res, 404, NoData); }
      const params = req.parameters.permit(AdminsModel.UPDATABLE_PARAMETERS).value();
      await admin.update(params);
      sendSuccess(res, { admin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async show (req: Request, res: Response) {
    try {
      const admin = await AdminsModel.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.adminId },
      });
      if (!admin) { return sendError(res, 404, NoData); }
      sendSuccess(res, { admin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const currentAdmin = req.currentAdmin;
      const admin = await AdminsModel.scope([{ method: ['byStatus', AdminsModel.STATUS_ENUM.INACTIVE] }]).findByPk(req.params.adminId);
      if (!admin || currentAdmin.id === admin.id) return sendError(res, 404, NoData);
      await admin.destroy();
      sendSuccess(res, { });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async active (req: Request, res: Response) {
    try {
      const currentAdmin = req.currentAdmin;
      const admin = await AdminsModel.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.adminId },
      });
      if (!admin || currentAdmin.id === admin.id) { return sendError(res, 404, NoData); }
      await admin.update({ status: AdminsModel.STATUS_ENUM.ACTIVE });
      sendSuccess(res, { admin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async inactive (req: Request, res: Response) {
    try {
      const currentAdmin = req.currentAdmin;
      const admin = await AdminsModel.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.adminId },
      });
      if (!admin || currentAdmin.id === admin.id) { return sendError(res, 404, NoData); }
      await admin.update({ status: AdminsModel.STATUS_ENUM.INACTIVE });
      sendSuccess(res, { admin });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new AdminController();

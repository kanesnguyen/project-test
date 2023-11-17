import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import settings from '@configs/settings';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import AdminInterface from '@interfaces/Admins';
import AdminEntity from '@entities/Admins';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AdminModel extends Model<AdminInterface> implements AdminInterface {
  public id: number;
  public avatar: string;
  public username: string;
  public password: string;
  public fullname: string;
  public phoneNumber: string;
  public email: string;
  public description: string;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  public static readonly UPDATABLE_PARAMETERS = ['avatar', 'username', 'fullname', 'phoneNumber', 'email']
  static readonly CREATABLE_PARAMETERS = ['avatar', 'username', 'password', 'fullname', 'phoneNumber', 'email', 'status'];
  static readonly STATUS_ENUM = { ACTIVE: 'active', INACTIVE: 'inactive' }

  static readonly hooks: Partial<ModelHooks<AdminModel>> = {
    beforeSave (record) {
      if (record.password && record.password !== record.previous('password')) {
        (record).hashPassword();
      }
    },
  }

  static readonly validations: ModelValidateOptions = {
    async uniqueUsername () {
      const existedRecord = await AdminModel.scope({ method: ['byUsername', this.username] }).findOne();
      if (existedRecord && existedRecord.id !== this.id) {
        throw new ValidationErrorItem('Username đã sử dụng. Vui lòng kiểm tra lại', 'uniqueUsername', 'username', this.username);
      }
    },
    async uniqueEmail () {
      const existedRecord = await AdminModel.scope({ method: ['byEmail', this.email] }).findOne();
      if (existedRecord && existedRecord.id !== this.id) {
        throw new ValidationErrorItem('Email đã sử dụng. Vui lòng kiểm tra lại', 'uniqueEmail', 'email', this.email);
      }
    },
  }

  static readonly scopes: ModelScopeOptions = {
    byEmail (email) {
      return {
        where: { email },
      };
    },
    byUsername (username) {
      return {
        where: { username },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { fullname: { [Op.like]: `%${freeWord || ''}%` } },
            { username: { [Op.like]: `%${freeWord || ''}%` } },
            { phoneNumber: { [Op.like]: `%${freeWord || ''}%` } },
          ],
        },
      };
    },
    byStatus (status) {
      return {
        where: { status },
      };
    },
    byId (id) {
      return {
        where: { id },
      };
    },
  }

  public async validPassword (password: string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      return false;
    }
  };

  public async generateAccessToken () {
    const token = jwt.sign({ id: this.id }, settings.jwt.secret, { expiresIn: settings.jwt.ttl });
    return token;
  };

  private hashPassword () {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  };

  public static initialize (sequelize: Sequelize) {
    this.init(AdminEntity, {
      hooks: AdminModel.hooks,
      scopes: AdminModel.scopes,
      validate: AdminModel.validations,
      tableName: 'admins',
      sequelize,
    });
  }

  public static associate () {
  }
}

export default AdminModel;

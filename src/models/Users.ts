import UserEntity from '@entities/Users';
import UserInterface from '@interfaces/Users';
import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import { ModelHooks } from 'sequelize/types/lib/hooks';
import bcrypt from 'bcryptjs';
import settings from '@configs/settings';
import jwt from 'jsonwebtoken';
import MailerService from '@services/mailer';
import dayjs from 'dayjs';

class UserModel extends Model<UserInterface> implements UserInterface {
  public id: number;
  public code: string;
  public type: string;
  public fullName: string;
  public phoneNumber: string;
  public email: string;
  public password: string;
  public forgotPasswordOtp: string;
  public forgotPasswordSentAt: Date;
  public avatar: string;
  public status: string;
  public dateOfBirth: Date;
  public gender: string;
  public facebookUserId: string;
  public googleUserId: string;
  public accumulatedMoney: number;
  public createdAt?: Date;
  public updatedAt?: Date

  public passwordConfirmation?: string;

  static readonly UPDATABLE_PARAMETERS = ['avatar', 'fullName', 'dateOfBirth', 'phoneNumber', 'gender']

  static readonly STATUS_ENUM = { ACTIVE: 'active', INACTIVE: 'inactive' }

  static readonly CREATABLE_PARAMETERS = ['fullName', 'phoneNumber', 'password', 'passwordConfirmation', 'email']

  static readonly hooks: Partial<ModelHooks<UserModel>> = {
    async beforeSave (record) {
      if (record.password && record.changed('password')) {
        const salt = bcrypt.genSaltSync();
        record.password = bcrypt.hashSync(record.password, salt);
      }
    },
    async beforeValidate (record) {
      if (!record.code) {
        record.code = await record.generateCode();
      }
    },
    beforeUpdate (record, options) {
      options.validate = false;
    },
  }

  static readonly validations: ModelValidateOptions = {
    async uniqueEmail () {
      if (!this.email) return;
      const user = await UserModel.scope([{ method: ['byEmail', this.email] }]).findOne();
      if (user && user.id !== this.id) {
        throw new ValidationErrorItem('Email đã sử dụng. Vui lòng kiểm tra lại', 'uniqueEmail', 'email', this.email);
      }
    },
    async verifyMatchPassword () {
      const isInputNewPassword = this.password !== this._previousDataValues.password;
      if (!isInputNewPassword && !this.passwordConfirmation) return;
      if (this.password !== this.passwordConfirmation) {
        throw new ValidationErrorItem('Xác nhận mật khẩu không khớp', 'verifyMatchPassword', 'passwordConfirmation', this.passwordConfirmation);
      }
    },
  }

  static readonly scopes: ModelScopeOptions = {
    byEmail (email) {
      return {
        where: { email },
      };
    },
    byCode (code) {
      return {
        where: { code },
      };
    },
    byFreeWord (freeWord) {
      return {
        where: {
          [Op.or]: [
            { fullName: { [Op.like]: `%${freeWord || ''}%` } },
            { code: { [Op.like]: `%${freeWord || ''}%` } },
            { email: { [Op.like]: `%${freeWord || ''}%` } },
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
    byType (type) {
      return {
        where: { type },
      };
    },
    byGender (gender) {
      return {
        where: { gender },
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
  }

  public async generateAccessToken () {
    const token = jwt.sign({ id: this.id }, settings.jwt.secret, { expiresIn: settings.jwt.ttl });
    return token;
  };

  public async sendForgotPasswordOtp () {
    const otp = this.generateOtp();
    await this.update({ forgotPasswordOtp: otp, forgotPasswordSentAt: dayjs() }, { validate: false });
    MailerService.sendForgotPasswordOtp(this.email, otp);
  }

  public checkValidForgotPasswordToken (otp: string) {
    return this.forgotPasswordOtp === otp && dayjs(this.forgotPasswordSentAt).add(settings.otpTtl, 'minute').toDate() > dayjs().toDate();
  }

  private async generateCode () {
    if (this.code) return;
    let code = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 6; i > 0; --i) code += characters[Math.floor(Math.random() * characters.length)];
    const existedUser = await UserModel.scope([{ method: ['byCode', code] }]).findOne();
    if (existedUser) code = await this.generateCode();
    return code;
  }

  private generateOtp () {
    let otp = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 16; i > 0; --i) otp += characters[Math.floor(Math.random() * characters.length)];
    return otp;
  };

  public static initialize (sequelize: Sequelize) {
    this.init(UserEntity, {
      hooks: UserModel.hooks,
      scopes: UserModel.scopes,
      validate: UserModel.validations,
      tableName: 'users',
      sequelize,
    });
  }

  public static associate () {}
}

export default UserModel;

import { DataTypes } from 'sequelize';

const UserEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
  },
  code: {
    type: DataTypes.STRING(30), allowNull: true,
  },
  type: {
    type: DataTypes.ENUM({ values: ['student', 'teacher', 'other'] }),
    defaultValue: 'student',
  },
  fullName: {
    type: DataTypes.STRING(100), allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(30), allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  forgotPasswordOtp: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  forgotPasswordSentAt: {
    type: DataTypes.DATE, allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    set (value: string) {
      if (!value) return this.setDataValue('avatar', null);
      this.setDataValue('avatar', decodeURIComponent(value.replace(process.env.COMMON_UPLOADER_ENDPOINT + '/', '')));
    },
    get (): string {
      const avatar = this.getDataValue('avatar')
        ? `${process.env.COMMON_UPLOADER_ENDPOINT}/${encodeURIComponent(this.getDataValue('avatar'))}`
        : null;
      return avatar;
    },
  },
  status: {
    type: DataTypes.ENUM({ values: ['active', 'inactive'] }),
    defaultValue: 'active',
  },
  dateOfBirth: {
    type: DataTypes.DATE, allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM({ values: ['male', 'female', 'other'] }),
    defaultValue: 'male',
  },
  facebookUserId: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  googleUserId: {
    type: DataTypes.STRING(255), allowNull: true,
  },
  accumulatedMoney: {
    type: DataTypes.INTEGER, defaultValue: 0,
  },
  passwordConfirmation: {
    type: DataTypes.VIRTUAL,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};

export default UserEntity;

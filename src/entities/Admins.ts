import { DataTypes } from 'sequelize';

const AdminEntity = {
  id: {
    type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
  },
  avatar: {
    type: DataTypes.STRING(255),
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
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(25),
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM({ values: ['active', 'inactive'] }),
    defaultValue: 'active',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export default AdminEntity;

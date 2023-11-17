'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
      },
      code: {
        type: Sequelize.STRING(30), allowNull: true,
      },
      type: {
        type: Sequelize.ENUM({ values: ['student', 'teacher', 'other'] }),
        defaultValue: 'student',
      },
      fullName: {
        type: Sequelize.STRING(100), allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(30), allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      password: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      forgotPasswordOtp: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      forgotPasswordSentAt: {
        type: Sequelize.DATE, allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      status: {
        type: Sequelize.ENUM({ values: ['active', 'inactive'] }),
        defaultValue: 'active',
      },
      dateOfBirth: {
        type: Sequelize.DATE, allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM({ values: ['male', 'female', 'other'] }),
        defaultValue: 'male',
      },
      facebookUserId: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      googleUserId: {
        type: Sequelize.STRING(255), allowNull: true,
      },
      accumulatedMoney: {
        type: Sequelize.INTEGER, defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8mb4',
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};

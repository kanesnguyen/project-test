'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync('admin001', salt);
    const admin = [{
      id: undefined,
      avatar: '',
      username: 'admin001',
      password: password,
      fullName: 'admin001',
      phoneNumber: '02123456789',
      email: 'admin001@gmail.com',
      description: null,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
    await queryInterface.bulkInsert('admins', admin, {});
  },

  down: async (queryInterface, Sequelize) => {
  },
};

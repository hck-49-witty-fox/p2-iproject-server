'use strict';
const {hashSync} = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const Users = require('../data/users.json');
    const Profiles = require('../data/profile.json');
    Users.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
      el.password = hashSync(el.password, 10)
    })
    Profiles.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', Users, {})
    await queryInterface.bulkInsert('Profiles', Profiles, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};

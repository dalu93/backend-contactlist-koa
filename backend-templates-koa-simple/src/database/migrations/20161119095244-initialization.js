/* eslint-disable camelcase */

export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      first_name: { allowNull: true, type: Sequelize.STRING },
      last_name: { allowNull: true, type: Sequelize.STRING },
      email: { allowNull: false, type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  down(queryInterface) {
    return queryInterface.dropTable('users')
  },
}

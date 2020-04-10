module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ResponseLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      requestMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responseTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responseStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('ResponseLogs');
  },
};

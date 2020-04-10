export default (sequelize, DataTypes) => {
  const ResponseLog = sequelize.define('ResponseLog', {
    requestUrl: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
    requestMethod: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
    responseTime: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
    responseStatus: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
      },
    },
  });
  return ResponseLog;
};

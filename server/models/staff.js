'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  // Initializatio
  Staff.init(
    {
      name: DataTypes.STRING,
      // roleId: DataTypes.,
      department: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      contact: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Staff',
      tableName: 'staffs'
    }
  );

  return Staff;
};
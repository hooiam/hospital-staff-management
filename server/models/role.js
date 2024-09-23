'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Role.hasMany(Staff, { foreignKey: 'roleId', as: 'staff' });
      Role.hasMany(models.Staff, { foreignKey: 'roleId', as: 'staffs', onDelete: 'CASCADE'})
    }
  }

  // Initialization
  Role.init(
    {
      name: DataTypes.STRING,
      permissions: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue('permissions');
          return rawValue ? rawValue.split(",") : null;
        }
      }
    }, 
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  );

  return Role;
};
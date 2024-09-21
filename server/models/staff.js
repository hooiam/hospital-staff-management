'use strict';

const { Model } = require('sequelize');
const Exception = require('../utils/exception')

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defining the relation between Staff and Role model
      Staff.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' })
    }
  }

  // Initializatio
  Staff.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'roles',
            key: 'id'
          }          
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      department: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Staff already exists. Please try with another contact number"
        }
      }
    },
    {
      sequelize,
      modelName: 'Staff',
      tableName: 'staffs'
    },
    {
      hooks: {
        beforeCreate: async (staff, options) => {
          console.log("is it coming here")
          const role = await sequelize.models.Role.findByPk(staff.roleId);
          if (!role) {
            throw new Exception("Invalid roleId. The roleId does not exist.", 400);
          }
        },
        beforeUpdate: async (staff, options) => {
          const role = await sequelize.models.Role.findByPk(staff.roleId);
          if (!role) {
            throw new Exception("Invalid roleId. The roleId does not exist.", 400);
          }
        }
      }    
    }, 
  );

  return Staff;
};


   
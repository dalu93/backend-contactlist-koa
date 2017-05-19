import _ from 'lodash'
import crypto from '../../utils/crypto'

export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'updated_at',
    },
  }, {
    tableName: 'users',
    classMethods: {
      // Example of model association
      /*
      associate(models) {
        User.hasMany(models.Order, {
          as: 'orders',
          foreignKey: { name: 'userId', field: 'user_id', allowNull: false },
          onDelete: 'RESTRICT',
        })

        User.belongsTo(models.Group, {
          as: 'group',
          foreignKey: { name: 'groupId', field: 'group_id', allowNull: false },
          onDelete: 'RESTRICT',
        })
      },
      */
    },
    instanceMethods: {
      // Prevent returning password field in the response
      toJSON() {
        const user = this.get()
        return _.omit(user, ['password'])
      },
    },
    hooks: {
      async beforeCreate(user) {
        user.password = await crypto.hashPassword(user.password)
      },
    },
  })

  return User
}

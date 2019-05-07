export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'slack_user', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //   isAlphanumeric: {
        //     args: true,
        //     msg: 'Username can only contain letter and numbers',
        //   },
        //   len: {
        //     args: [3, 25],
        //     msg: 'Username can be 3 to 25 characters long',
        //   },
        // },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //   isEmail: {
        //     args: true,
        //     msg: 'Invalid Email',
        //   },
        // },
      },
      password: {
        type: DataTypes.STRING,
        // validate: {
        //   args: [5, 100],
        //   msg: 'Password can be 5 to 100 characetrs long',
        // },
      },
    },
    { underscored: true },
  );
  
  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    // N-M
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };
  return User;
};
export default (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'channel',
    {
      name: DataTypes.STRING,
      public: {
        type: DataTypes.BOOLEAN,
        defaultvalue: true,
      },
    },
    { underscored: true },
  );
  
  // Association goes here 
  Channel.associate = (models) => {
    // 1-M : A channel will have a Team and a team can have multiple channel 
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    // N-M - A channel can have multiple users and a user can be in multiple channels 
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      },
    });
  };
  return Channel;
};

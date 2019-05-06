export default (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'team', 
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, 
    { underscored: true },
  );

  Team.associate = (models) => {
    // N-M
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    // 1-M
    Team.belongsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Team;
};
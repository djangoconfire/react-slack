// import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
      models.Team.findall({ where: { owner: user.id } }, { raw: true })),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Team.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: [{ path: 'name', message: 'Something went wrong!' }],
        };
      }
    }),
  },

  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ teamId: id }),
  },
};
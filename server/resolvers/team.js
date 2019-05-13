// import { formatErrors } from '../formatError';

export default {
    Query: {
        allTeams: (parent, args, { models }) => models.Team.findAll(),
    },
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            try {
                await models.Team.create({ ...args, owner: user.id });
                return {
                    ok: true,
                }
            } catch(err) {
                return {
                    ok: false,
                    errors: [{ path: 'name', message: 'Something went wrong!'}],
                }
            }
        }
    }
};
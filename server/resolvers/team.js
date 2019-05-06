export default {
    Query: {
        allTeams: (parent, args, { models }) => models.Team.findAll(),
    },
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            try {
                await models.Team.create({ ...args, owner: user.id });
                return true;
            } catch(err) {
                console.log('Error ocured', err);
                return false;
            }
        }
    }
};
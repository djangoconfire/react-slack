import formatErrors from '../formatErrors';

export default {
    Query: {
        allChannels: (aprent, args, { models }) => models.Channel.findAll(),
    },
    Mutation: {
        createChannel: async (parent, args, { models }) => {
            try { 
                const channel = await models.Channel.create(args);
                return {
                    ok: true,
                    channel,
                }
            } catch(err) {
                return {
                    ok: false,
                    errors: formatErrors(err),
                }
            }  
        }
    }
};
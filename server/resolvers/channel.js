export default {
    Query: {
        allChannels: (aprent, args, { models }) => models.Channel.findAll(),
    },
    Mutation: {
        createChannel: async (parent, args, { models }) => {
            try { 
                await models.Channel.create(args);
                return true;
            } catch(err) {
                console.log(err)
                return false;
            }  
        }
    }
};
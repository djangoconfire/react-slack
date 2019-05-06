/*
  @author: RituRaj
  created: 3 May,19
*/
export default {
  Query: {
    // SINGLE USER DETAIL
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    // ALL USERS DETAILS
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
  },

};

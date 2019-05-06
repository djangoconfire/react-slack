/*
  @author: RituRaj
  created: 3 May,19
*/

import bcrypt from 'bcrypt'; // Hashed the password 

export default {
  Query: {
    // SINGLE USER DETAIL
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    // ALL USERS DETAILS
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await models.User.create({ ...otherArgs, password: hashedPassword });
        return newUser;
      } catch (err) {
        console.log('Error occured', password, otherArgs);
        return err;
      }
    },
  },
};

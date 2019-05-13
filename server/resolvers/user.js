/*
  @author: RituRaj
  created: 3 May,19
*/

import bcrypt from 'bcrypt'; // Hashed the password 
import _ from 'lodash'; // lodash imports 
import { loginFunc } from '../auth';
import { formatErrors } from '../formatError'; 

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: async(parent, { email, password }, { models, SECRET, SECRET2 }) =>
      loginFunc(email, password, models, SECRET, SECRET2),
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'Password needs to be between 5 to 100 characters long',
              },
            ],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs, password: hashedPassword });
        return { 
          ok: true,
          user,
        };
      } catch (err) {
          console.log('Error occured', password, otherArgs, err);
          return {
            ok: false,
            errors: formatErrors(err, models),
          };
        }
      },
    },
};

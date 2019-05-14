import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import cors from 'cors';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import jwt from 'jsonwebtoken';
import models from './models';
import { refreshTokens } from './auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


const SECRET = 'ewrghjggxcvnmjiofslkrjfknmsvosavkln1234fsfnlkfj';
const SECRET2 = 'wjerfjknslnadadadadekjoklndadsafsaerfdgfhgdht234';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express(); 
app.use(cors('*'));

const addUser = async (req, res, next) => { 
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newToken = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newToken.token && newToken.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
        res.set('x-token', newToken.token);
        res.set('x-refresh-token', newToken.refreshToken);
      }
      req.user = newToken.user;
    }
  }
  next();
};

app.use(addUser);

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint, bodyParser.json(), 
  graphqlExpress(req => ({ 
    schema, 
    context: { 
      models, 
      user: req.user,
      SECRET,
      SECRET2,
    }
  }),
  ),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
  app.listen(8081);
});
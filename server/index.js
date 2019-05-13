import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import cors from 'cors';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

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

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint, bodyParser.json(), 
  graphqlExpress({ 
    schema, 
    context: { 
      models, 
      user: { id: 1 }, 
      SECRET,
      SECRET2,
      } 
    })  
  );

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
  app.listen(8081);
});
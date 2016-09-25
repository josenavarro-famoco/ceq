import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  buildSchema
} from 'graphql';

const app = express();

const PORT = process.env.PORT || 3000;

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.get('/', (req, res) => res.end('Hello World'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

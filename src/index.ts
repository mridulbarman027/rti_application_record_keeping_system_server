import bodyParser from 'body-parser';
import express, {
  Request, Response, Application,
} from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import connectMongo from './config/mongo';

const app: Application = express();

const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('heloo');
});

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }
    type RootMutation {
      createEvent(name: String): String
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['asda', 'erwr'];
    },
    createEvents: (args: String) => {
      return args;
    }
  },
  graphiql: true,
}));

connectMongo().then(() => {
  app.listen(PORT);
}).catch(error => {
  console.log(error);
});



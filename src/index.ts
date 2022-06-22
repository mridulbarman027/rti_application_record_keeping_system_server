import { Admin } from './models/admin.schema';
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

app.get('/', async (req: Request, res: Response) => {
  const saveAdmin = new Admin({
    admin_username: "state_public_infromation_officier",
    admin_password: "122343",
    admin_name: "Demo Name",
    admin_type: 2
  });

  await saveAdmin.save();
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



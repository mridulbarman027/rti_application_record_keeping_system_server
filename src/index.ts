import { isAuth } from './middlewares/is_auth';
import bodyParser from 'body-parser';
import express, {
  Request, Response, Application,
} from 'express';
import { graphqlHTTP } from 'express-graphql';
import connectMongo from './config/mongo';
import { schema } from './graphql/schemas';
import { root } from './graphql/resolvers';

const app: Application = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use(isAuth);

app.get('/', (req: Request, res: Response) => {
  /* const hashedPassword = await bcrypt.hash('12345', 12);
  const saveAdmin = new Admin({
    admin_username: "state_public_infromation_officier",
    admin_password: hashedPassword,
    admin_name: "Example",
    admin_type: 2
  });

  await saveAdmin.save(); */
  res.send('heloo');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

connectMongo().then(() => {
  app.listen(PORT);
}).catch(error => {
  console.log(error);
});



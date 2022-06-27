import { NextFunction, Request, Response } from 'express';
import { isAuth } from './middlewares/is_auth';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import connectMongo from './config/mongo';
import { schema } from './graphql/schemas';
import { root } from './graphql/resolvers';

declare global {
  namespace Express {
      interface Request {
          isAuth: boolean,
          userId: string
      }
  }
}

const app: Application = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } 
  return next();
});

app.use(isAuth);

/* app.get('/', (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash('12345', 12);
  const saveAdmin = new Admin({
    admin_username: "state_public_infromation_officier",
    admin_password: hashedPassword,
    admin_name: "Example",
    admin_type: 2
  });

  await saveAdmin.save();
  res.send('heloo');
}); */

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



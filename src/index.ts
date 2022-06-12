import express, {
  Request, Response, Application,
} from 'express';
import connectMongo from './config/mongo';

const app: Application = express();

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('heloo');
});

connectMongo().then(() => {
  app.listen(PORT);
}).catch(error => {
  console.log(error);
});



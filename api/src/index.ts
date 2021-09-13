import express from 'express';
import urlController from './controllers/url';
import mongoConnection from './connection';
import UrlModel from './models/url.model';
import CounterModel from './models/counter.model';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => res.status(200).send('Hello world'));

app.use('/api/urls', urlController);

async function setupMongo(): Promise<void> {
  await mongoConnection();
}

setupMongo()
  .then(async () => {
    console.log('MongoDb Connected');
    // TODO Setup our default mongo stores
    UrlModel.deleteMany({}, () => {
      console.log('Removed URLs');
    });

    CounterModel.deleteMany({}, async () => {
      console.log('Removed Counters');

      const counter = new CounterModel({
        _id: 'count',
        count: 100003456,
      });

      await counter.save();
    });

    // Make sure mongo connected before we start the server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));

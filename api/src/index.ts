import express from 'express';
import urlController from './controllers/url';
import mongoConnection from './connection';
import UrlModel from './models/url.model';
import CounterModel from './models/counter.model';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Default route to test its up and running - would have health checks hit this and check for a 200 status
app.get('/', (req, res) => res.status(200).send('Hello world'));

app.use('/api/urls', urlController);

async function setupMongo(): Promise<void> {
  await mongoConnection();
}

setupMongo()
  .then(async () => {
    console.log('MongoDb Connected');

    // Seeding the db here - would not be present in a prod app but its here for convenience setup for primary bid challenge
    UrlModel.deleteMany({}, () => {
      console.log('Removed URLs');
    });

    CounterModel.deleteMany({}, async () => {
      console.log('Removed Counters');

      const counter = new CounterModel({
        _id: 'count',
        count: 100003456, // aribitrary number to start from - just to make the urls look nicer technically we can go up to 36^8 but this gives us headroom!
      });

      await counter.save();
    });

    // Make sure mongo connected before we start the server
    // demo purposes but definitely a shortcut here as we could do repeat checks etc and handle disconnects/reconnects
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));

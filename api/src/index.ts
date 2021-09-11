import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

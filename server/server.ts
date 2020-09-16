import { DatabaseDebt } from '../src/app/models/databaseDebt';
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import Datastore = require('nedb-promises');

const debtsDb = Datastore.create('server/db/debts.db');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());

// API
app.get('/api/debts', async function (req, res) {
  try {
    const debts = await debtsDb.find({});
    res.json(debts);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});
app.get('/api/debts/:id', async function (req, res) {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  console.log(debtId);
  const debt = await debtsDb.findOne({ id: debtId });
  console.log(debt);
  if (debt) {
    res.json(debt);
  } else {
    res.status(404).send('Not found');
  }
});
app.post('/api/debts', async (req, res) => {
  if (!req.body.name || !req.body.debt) {
    res.status(400).send('Bad params');
    return;
  }
  const id = Date.now();
  const debt: DatabaseDebt = { ...req.body, id };
  const inderted = await debtsDb.insert({ ...debt });
  const addedDebt = await debtsDb.findOne({ _id: inderted._id });
  if (!addedDebt) {
    res.status(500).send('Something went wrong');
    return;
  }
  res.status(201).json(addedDebt);
});
app.put('/api/debts/:id', async (req, res) => {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  if (!req.body.name || !req.body.debt) {
    res.status(400).send('Bad params');
    return;
  }
  const updatedDebt = await debtsDb.update(
    { id: debtId },
    { id: debtId, ...req.body }
  );
  if (updatedDebt) {
    res.json('Successfully updated');
  } else {
    res.status(500).send('Something went wrong');
  }
});
app.delete('/api/debts/:id', async (req, res) => {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  let result = await debtsDb.remove({ id: debtId }, {});
  if (result) {
    res.status(200).send('Successfully deleted');
  } else {
    res.status(500).send('Something went wrong');
  }
});
app.get('/api/search', async (req, res) => {
  const query = req.query.searchData;
  if (!query) {
    res.status(400).send('Bad request');
  }
  const regex = new RegExp(`${query}`, 'i');
  const debts = await debtsDb.find({ name: regex });
  res.send(debts);
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});

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

// DB
// let debts: DatabaseDebt[] = [
//   {
//     id: 1,
//     name: 'Alex',
//     debt: 1000,
//     loanDate: '2020-11-04T17:00:00.000Z',
//     paymentDate: '2020-11-10T17:00:00.000Z',
//   },
//   {
//     id: 2,
//     name: 'Ivan',
//     debt: 1500,
//     loanDate: '2020-11-04T17:00:00.000Z',
//     paymentDate: '2020-11-10T17:00:00.000Z',
//   },
//   {
//     id: 3,
//     name: 'Alfred',
//     debt: 100,
//     loanDate: '2020-11-04T17:00:00.000Z',
//   },
//   {
//     id: 4,
//     name: 'John',
//     debt: 1500,
//     loanDate: '2020-11-04T17:00:00.000Z',
//     paymentDate: '2020-05-22T17:00:00.000Z',
//   },
// ];
// (async function () {
//   for (const debt of debts) {
//     await debtsDb.insert(debt);
//   }
// })();

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

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});

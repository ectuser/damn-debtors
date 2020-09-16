import { DatabaseDebt } from '../src/app/models/databaseDebt';
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());

// DB
let debts: DatabaseDebt[] = [
  {
    id: 1,
    name: 'Alex',
    debt: 1000,
    loanDate: '2020-11-04T17:00:00.000Z',
    paymentDate: '2020-11-10T17:00:00.000Z',
  },
  {
    id: 2,
    name: 'Ivan',
    debt: 1500,
    loanDate: '2020-11-04T17:00:00.000Z',
    paymentDate: '2020-11-10T17:00:00.000Z',
  },
  {
    id: 3,
    name: 'Alfred',
    debt: 100,
    loanDate: '2020-11-04T17:00:00.000Z',
  },
  {
    id: 4,
    name: 'John',
    debt: 1500,
    loanDate: '2020-11-04T17:00:00.000Z',
    paymentDate: '2020-05-22T17:00:00.000Z',
  },
];

// API
app.get('/api/debts', function (req, res) {
  res.json(debts);
});
app.get('/api/debts/:id', function (req, res) {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  console.log(debtId);
  const debt = debts.find((el) => el.id === debtId);
  if (debt) {
    res.json(debt);
  } else {
    res.status(404).send('Not found');
  }
});
app.post('/api/debt', (req, res) => {
  if (req.body.name && req.body.debt) {
    const id = Date.now();
    const debt: DatabaseDebt = { ...req.body, id };
    debts.push(debt);
    const addedDebt = debts.find((el) => el.id === id);
    if (addedDebt) {
      res.status(201).json(addedDebt);
      return;
    }
  }
  res.status(400).send('Bad params');
});
app.put('/api/debt/:id', (req, res) => {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  let debt = debts.find((el) => el.id === debtId);
  const debtIndex = debts.indexOf(debt);
  if (!debt) {
    res.status(404).send('Not found');
    return;
  }
  if (!req.body.name || !req.body.debt) {
    res.status(400).send('Bad params');
  }
  debt = { ...req.body, id: debtId };
  debts[debtIndex] = { ...debt };

  const addedDebt = debts.find((el) => el.id === debtId);
  if (!addedDebt) {
    res.status(400).send('Something went wrong');
  }
  res.json(addedDebt);
});
app.delete('/api/debt/:id', (req, res) => {
  const debtId = Number(req.params.id);
  if (!debtId) {
    res.status(400).send('Bad Request');
    return;
  }
  let debt = debts.find((el) => el.id === debtId);
  const debtIndex = debts.indexOf(debt);
  if (!debt) {
    res.status(404).send('Not found');
    return;
  }
  debts.splice(debtIndex, 1);
  res.status(200).send('Successfully deleted');
});

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});

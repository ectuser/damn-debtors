import { DatabaseDebt } from '../src/app/models/databaseDebt';
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Datastore = require('nedb-promises');

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const debtsDb = Datastore.create('server/db/debts.db');
const usersDb = Datastore.create('server/db/users.db');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'idkwhatisitsorry',
};
passport.use(
  new Strategy(opts, async (payload, done) => {
    const user = await usersDb
      .findOne({ id: payload.id })
      .catch((err) => console.error(err));
    if (!user) {
      return done(null, false);
    }
    return done(null, {
      id: user.id,
      email: user.email,
    });
  })
);

// API
app.get(
  '/api/debts',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      const debts = await debtsDb.find({});
      res.json(debts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
app.get(
  '/api/debts/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const debtId = req.params.id;
    if (!debtId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    console.log(debtId);
    const debt = await debtsDb.findOne({ id: debtId });
    console.log(debt);
    if (debt) {
      res.json(debt);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
);
app.post(
  '/api/debts',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body.name || !req.body.debt) {
      res.status(400).json({ message: 'Bad params' });
      return;
    }
    const id = generateId();
    const debt: DatabaseDebt = { ...req.body, id };
    const inderted = await debtsDb.insert({ ...debt });
    const addedDebt = await debtsDb.findOne({ _id: inderted._id });
    if (!addedDebt) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
    res.status(201).json(addedDebt);
  }
);
app.put(
  '/api/debts/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const debtId = req.params.id;
    if (!debtId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    if (!req.body.name || !req.body.debt) {
      res.status(400).json({ message: 'Bad params' });
      return;
    }
    const updatedDebt = await debtsDb.update(
      { id: debtId },
      { id: debtId, ...req.body }
    );
    if (updatedDebt) {
      res.json({ message: 'Successfully updated' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
app.delete(
  '/api/debts/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const debtId = req.params.id;
    if (!debtId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    let result = await debtsDb.remove({ id: debtId }, {});
    if (result) {
      res.status(200).json({ message: 'Successfully deleted' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
app.get(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const query = req.query.searchData;
    if (!query) {
      res.status(400).json({ message: 'Bad request' });
    }
    const regex = new RegExp(`${query}`, 'i');
    const debts = await debtsDb.find({ name: regex });
    res.send(debts);
  }
);
app.post('/api/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }
  const { email, password } = req.body;
  const salt = generateSalt();
  const encryptedPassword = encryptPassword(password, salt);

  const existedUser = await usersDb.findOne({ email });
  if (existedUser) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }
  const inderted = await usersDb.insert({
    email,
    password: encryptedPassword,
    id: generateId(),
    salt,
  });
  const addedUser = await usersDb.findOne({ _id: inderted._id });
  if (!addedUser) {
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
  res.status(201).json(addedUser);
});
app.post('/api/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }
  const { email, password } = req.body;

  const user = await usersDb.findOne({ email });

  const result = checkThePassword(password, user.password, user.salt);
  if (result) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    jwt.sign(
      payload,
      'idkwhatisitsorry',
      { expiresIn: 36000 },
      (err, token) => {
        if (err)
          res.status(500).json({ error: 'Error signing token', raw: err });
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
        res.json(user);
      }
    );
  } else {
    res.status(401).json({ message: '123' });
  }
});
app.get(
  '/api/users/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const debtId = req.params.id;
    if (!debtId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const user = await usersDb.findOne({ id: debtId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Can't find the user" });
    }
  }
);
app.get(
  '/api/check-the-token',
  passport.authenticate('jwt', { session: false })
);

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
});

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const encryptPassword = (password: string, salt: string): String =>
  crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
const checkThePassword = (
  insertedPassword: string,
  databasePassword: string,
  databaseSalt: string
): Boolean => {
  const hash = encryptPassword(insertedPassword, databaseSalt);
  return hash === databasePassword;
};
const generateSalt = (): string => crypto.randomBytes(16).toString('hex');

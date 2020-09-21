require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
import passport from './passport';
import { debtsDb, usersDb } from './db/dbConnection';
import debtsRouter from './api/routes/debts';
import authRouter from './api/routes/auth';
import usersRouter from './api/routes/users';

const app = express();
const PORT = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());

// API
app.use('/api/debts', debtsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
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

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});

// Start the app by listening on the default Heroku port
app.listen(PORT, () => {
  console.log(`Server launched on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});

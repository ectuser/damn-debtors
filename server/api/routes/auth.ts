const express = require('express');
const authRouter = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
import { debtsDb, usersDb } from '../../db/dbConnection';
import passport from '../../passport';
import {
  checkThePassword,
  generateId,
  encryptPassword,
  generateSalt,
  getSecretForPassport,
} from '../../services/securityService';

authRouter.post('/register', async (req, res) => {
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
  res.status(201).json({ success: true, message: 'User successfully created' });
});
authRouter.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }
  const { email, password } = req.body;

  const user = await usersDb.findOne({ email });

  if (!user) {
    res.status(401).json({ message: 'Wrong email or password' });
    return;
  }

  const result = checkThePassword(password, user.password, user.salt);
  if (result) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    jwt.sign(
      payload,
      getSecretForPassport(),
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
    res.status(401).json({ message: 'Wrong email or password' });
  }
});
authRouter.get(
  '/check-the-token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'Success' });
  }
);

export default authRouter;

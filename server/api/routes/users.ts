const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
import { debtsDb, usersDb } from '../../db/dbConnection';
import passport from '../../passport';
import { GetUserProfile } from '../../client-server-models.ts/get-user-profile';
import {
  checkThePassword,
  encryptPassword,
  generateSalt,
  getSecretForPassport,
} from '../../services/securityService';

// usersRouter.get(
//   '/:userId',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     const debtuserId = req.params.userId;
//     if (!debtuserId) {
//       res.status(400).json({ message: 'Bad Request' });
//       return;
//     }
//     const user = await usersDb.findOne({ userId: debtuserId });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "Can't find the user" });
//     }
//   }
// );
usersRouter.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user || !req.user.id) {
      res.status(404).json({ message: "Can't find user" });
      return;
    }
    const userId = req.user.id;

    const dbUser = await usersDb.findOne({ id: userId });
    if (!dbUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const userDebts = await debtsDb.find({ userId });
    const amountOfMoney = userDebts.reduce((sum, el) => sum + el.debt, 0);
    const obj: GetUserProfile = {
      email: dbUser.email,
      numberOfDebts: userDebts.length,
      amountOfMoney,
    };
    res.json(obj);
  }
);
usersRouter.put(
  '/password',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    if (req.body.oldPassword === req.body.newPassword) {
      res
        .status(400)
        .json({ message: 'Old and new passwords should not match' });
      return;
    }
    if (!req.user || !req.user.id) {
      res.status(404).json({ message: "Can't find user" });
      return;
    }
    const userId = req.user.id;
    const dbUser = await usersDb.findOne({ id: userId });
    if (!dbUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const result = checkThePassword(
      req.body.oldPassword,
      dbUser.password,
      dbUser.salt
    );
    if (!result) {
      res.status(403).json({ message: 'Wrong password' });
      return;
    }
    const salt = generateSalt();
    const encryptedPassword = encryptPassword(req.body.newPassword, salt);

    const updatePasswordResult = await usersDb.update(
      { id: dbUser.id },
      { ...dbUser, password: encryptedPassword, salt }
    );

    if (updatePasswordResult) {
      const payload = {
        id: dbUser.id,
        email: dbUser.email,
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
        }
      );
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
usersRouter.put(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body.email) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    if (!req.user || !req.user.id) {
      res.status(404).json({ message: "Can't find user" });
      return;
    }
    const userId = req.user.id;
    const dbUser = await usersDb.findOne({ id: userId });
    if (!dbUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const result = await usersDb.update(
      { id: userId },
      { ...dbUser, email: req.body.email }
    );
    if (result) {
      res.json({ message: 'Profile updated' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

export default usersRouter;

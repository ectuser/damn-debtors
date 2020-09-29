const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
import { debtsDb, usersDb } from '../../db/dbConnection';
import passport from '../../passport';
import { GetUserProfile } from '../../../client-server-models.ts/get-user-profile';

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

export default usersRouter;

const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
import { debtsDb, usersDb } from '../../db/dbConnection';
import passport from '../../passport';

// usersRouter.get(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     const debtId = req.params.id;
//     if (!debtId) {
//       res.status(400).json({ message: 'Bad Request' });
//       return;
//     }
//     const user = await usersDb.findOne({ id: debtId });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "Can't find the user" });
//     }
//   }
// );
usersRouter.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if ()
})

export default usersRouter;

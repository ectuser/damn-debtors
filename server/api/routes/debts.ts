import { generateId } from '../../services/securityService';
import { DatabaseDebt } from '../../../src/app/models/databaseDebt';
import passport from '../../passport';
import { debtsDb, usersDb } from '../../db/dbConnection';

const express = require('express');
const debtsRouter = express.Router();
const bodyParser = require('body-parser');

debtsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    const userId = req.user.id;
    try {
      const debts = await debtsDb.find({ userId });
      res.json(debts);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
debtsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const debtId = req.params.id;
    if (!debtId || !req.user || !req.user.id) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const userId = req.user.id;
    console.log(debtId);
    const debt = await debtsDb.findOne({ id: debtId, userId });
    console.log(debt);
    if (debt) {
      res.json(debt);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
);
debtsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.body.name || !req.body.debt) {
      res.status(400).json({ message: 'Bad params' });
      return;
    }
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    const id = generateId();
    const userId = req.user.id;
    const debt: DatabaseDebt = { ...req.body, id, userId };
    const inderted = await debtsDb.insert({ ...debt });
    const addedDebt = await debtsDb.findOne({ _id: inderted._id });
    if (!addedDebt) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
    res.status(201).json(addedDebt);
  }
);
debtsRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const debtId = req.params.id;
    if (!debtId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    if (!req.body.name || !req.body.debt || !req.user || !req.user.id) {
      res.status(400).json({ message: 'Bad params' });
      return;
    }
    const userId = req.user.id;
    const updatedDebt = await debtsDb.update(
      { id: debtId, userId },
      { id: debtId, ...req.body }
    );
    if (updatedDebt) {
      res.json({ message: 'Successfully updated' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
debtsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const debtId = req.params.id;
    if (!debtId || !req.user || !req.user.id) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
    const userId = req.user.id;
    let result = await debtsDb.remove({ id: debtId, userId }, {});
    if (result) {
      res.status(200).json({ message: 'Successfully deleted' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

export default debtsRouter;

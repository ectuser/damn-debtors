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
    try {
      const debts = await debtsDb.find({});
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
debtsRouter.post(
  '/',
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
debtsRouter.put(
  '/:id',
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
debtsRouter.delete(
  '/:id',
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

export default debtsRouter;

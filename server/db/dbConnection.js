"use strict";
exports.__esModule = true;
exports.usersDb = exports.debtsDb = void 0;
var Datastore = require('nedb-promises');
exports.debtsDb = Datastore.create('server/db/debts.db');
exports.usersDb = Datastore.create('server/db/users.db');

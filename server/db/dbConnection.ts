const Datastore = require('nedb-promises');
export const debtsDb = Datastore.create('server/db/debts.db');
export const usersDb = Datastore.create('server/db/users.db');

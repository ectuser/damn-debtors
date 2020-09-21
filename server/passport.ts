const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
import { debtsDb, usersDb } from './db/dbConnection';
import { getSecretForPassport } from './services/securityService';
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretForPassport(),
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

export default passport;

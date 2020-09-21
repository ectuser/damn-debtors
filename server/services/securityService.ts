const crypto = require('crypto');

export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const encryptPassword = (password: string, salt: string): String =>
  crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
export const checkThePassword = (
  insertedPassword: string,
  databasePassword: string,
  databaseSalt: string
): Boolean => {
  const hash = encryptPassword(insertedPassword, databaseSalt);
  return hash === databasePassword;
};
export const generateSalt = (): string =>
  crypto.randomBytes(16).toString('hex');

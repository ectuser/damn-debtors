"use strict";
exports.__esModule = true;
exports.getSecretForPassport = exports.generateSalt = exports.checkThePassword = exports.encryptPassword = exports.generateId = void 0;
var crypto = require('crypto');
exports.generateId = function () { return '_' + Math.random().toString(36).substr(2, 9); };
exports.encryptPassword = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};
exports.checkThePassword = function (insertedPassword, databasePassword, databaseSalt) {
    var hash = exports.encryptPassword(insertedPassword, databaseSalt);
    return hash === databasePassword;
};
exports.generateSalt = function () {
    return crypto.randomBytes(16).toString('hex');
};
exports.getSecretForPassport = function () {
    return process.env.SECRET_FOR_PASSPORT;
};

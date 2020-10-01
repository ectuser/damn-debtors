"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require('express');
var usersRouter = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var dbConnection_1 = require("../../db/dbConnection");
var passport_1 = require("../../passport");
var securityService_1 = require("../../services/securityService");
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
usersRouter.get('/profile', passport_1["default"].authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, dbUser, userDebts, amountOfMoney, obj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user || !req.user.id) {
                    res.status(404).json({ message: "Can't find user" });
                    return [2 /*return*/];
                }
                userId = req.user.id;
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ id: userId })];
            case 1:
                dbUser = _a.sent();
                if (!dbUser) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbConnection_1.debtsDb.find({ userId: userId })];
            case 2:
                userDebts = _a.sent();
                amountOfMoney = userDebts.reduce(function (sum, el) { return sum + el.debt; }, 0);
                obj = {
                    email: dbUser.email,
                    numberOfDebts: userDebts.length,
                    amountOfMoney: amountOfMoney
                };
                res.json(obj);
                return [2 /*return*/];
        }
    });
}); });
usersRouter.put('/password', passport_1["default"].authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, dbUser, result, salt, encryptedPassword, updatePasswordResult, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.oldPassword || !req.body.newPassword) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                if (req.body.oldPassword === req.body.newPassword) {
                    res
                        .status(400)
                        .json({ message: 'Old and new passwords should not match' });
                    return [2 /*return*/];
                }
                if (!req.user || !req.user.id) {
                    res.status(404).json({ message: "Can't find user" });
                    return [2 /*return*/];
                }
                userId = req.user.id;
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ id: userId })];
            case 1:
                dbUser = _a.sent();
                if (!dbUser) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                result = securityService_1.checkThePassword(req.body.oldPassword, dbUser.password, dbUser.salt);
                if (!result) {
                    res.status(403).json({ message: 'Wrong password' });
                    return [2 /*return*/];
                }
                salt = securityService_1.generateSalt();
                encryptedPassword = securityService_1.encryptPassword(req.body.newPassword, salt);
                return [4 /*yield*/, dbConnection_1.usersDb.update({ id: dbUser.id }, __assign(__assign({}, dbUser), { password: encryptedPassword, salt: salt }))];
            case 2:
                updatePasswordResult = _a.sent();
                if (updatePasswordResult) {
                    payload = {
                        id: dbUser.id,
                        email: dbUser.email
                    };
                    jwt.sign(payload, securityService_1.getSecretForPassport(), { expiresIn: 36000 }, function (err, token) {
                        if (err)
                            res.status(500).json({ error: 'Error signing token', raw: err });
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [2 /*return*/];
        }
    });
}); });
usersRouter.put('/profile', passport_1["default"].authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, dbUser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                if (!req.user || !req.user.id) {
                    res.status(404).json({ message: "Can't find user" });
                    return [2 /*return*/];
                }
                userId = req.user.id;
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ id: userId })];
            case 1:
                dbUser = _a.sent();
                if (!dbUser) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbConnection_1.usersDb.update({ id: userId }, __assign(__assign({}, dbUser), { email: req.body.email }))];
            case 2:
                result = _a.sent();
                if (result) {
                    res.json({ message: 'Profile updated' });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = usersRouter;

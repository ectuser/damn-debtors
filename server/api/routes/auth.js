"use strict";
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
var authRouter = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var dbConnection_1 = require("../../db/dbConnection");
var passport_1 = require("../../passport");
var securityService_1 = require("../../services/securityService");
authRouter.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, salt, encryptedPassword, existedUser, inderted, addedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.body.email || !req.body.password) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                _a = req.body, email = _a.email, password = _a.password;
                salt = securityService_1.generateSalt();
                encryptedPassword = securityService_1.encryptPassword(password, salt);
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ email: email })];
            case 1:
                existedUser = _b.sent();
                if (existedUser) {
                    res.status(409).json({ message: 'User already exists' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbConnection_1.usersDb.insert({
                        email: email,
                        password: encryptedPassword,
                        id: securityService_1.generateId(),
                        salt: salt
                    })];
            case 2:
                inderted = _b.sent();
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ _id: inderted._id })];
            case 3:
                addedUser = _b.sent();
                if (!addedUser) {
                    res.status(500).json({ message: 'Something went wrong' });
                    return [2 /*return*/];
                }
                res.status(201).json({ success: true, message: 'User successfully created' });
                return [2 /*return*/];
        }
    });
}); });
authRouter.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, result, payload;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.body.email || !req.body.password) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, dbConnection_1.usersDb.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401).json({ message: 'Wrong email or password' });
                    return [2 /*return*/];
                }
                result = securityService_1.checkThePassword(password, user.password, user.salt);
                if (result) {
                    payload = {
                        id: user.id,
                        email: user.email
                    };
                    jwt.sign(payload, securityService_1.getSecretForPassport(), { expiresIn: 36000 }, function (err, token) {
                        if (err)
                            res.status(500).json({ error: 'Error signing token', raw: err });
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                        res.json(user);
                    });
                }
                else {
                    res.status(401).json({ message: 'Wrong email or password' });
                }
                return [2 /*return*/];
        }
    });
}); });
authRouter.get('/check-the-token', passport_1["default"].authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: 'Success' });
});
exports["default"] = authRouter;

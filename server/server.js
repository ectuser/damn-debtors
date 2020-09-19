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
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var Datastore = require('nedb-promises');
var passport = require('passport');
var _a = require('passport-jwt'), Strategy = _a.Strategy, ExtractJwt = _a.ExtractJwt;
var jwt = require('jsonwebtoken');
var debtsDb = Datastore.create('server/db/debts.db');
var usersDb = Datastore.create('server/db/users.db');
var app = express();
var PORT = process.env.PORT || 8080;
// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'idkwhatisitsorry'
};
passport.use(new Strategy(opts, function (payload, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersDb
                    .findOne({ id: payload.id })["catch"](function (err) { return console.error(err); })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                return [2 /*return*/, done(null, {
                        id: user.id,
                        email: user.email
                    })];
        }
    });
}); }));
// API
app.get('/api/debts', passport.authenticate('jwt', { session: false }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var debts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, debtsDb.find({})];
                case 1:
                    debts = _a.sent();
                    res.json(debts);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).json({ message: 'Something went wrong' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get('/api/debts/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var debtId, debt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debtId = req.params.id;
                    if (!debtId) {
                        res.status(400).json({ message: 'Bad Request' });
                        return [2 /*return*/];
                    }
                    console.log(debtId);
                    return [4 /*yield*/, debtsDb.findOne({ id: debtId })];
                case 1:
                    debt = _a.sent();
                    console.log(debt);
                    if (debt) {
                        res.json(debt);
                    }
                    else {
                        res.status(404).json({ message: 'Not found' });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/api/debts', passport.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, debt, inderted, addedDebt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name || !req.body.debt) {
                    res.status(400).json({ message: 'Bad params' });
                    return [2 /*return*/];
                }
                id = generateId();
                debt = __assign(__assign({}, req.body), { id: id });
                return [4 /*yield*/, debtsDb.insert(__assign({}, debt))];
            case 1:
                inderted = _a.sent();
                return [4 /*yield*/, debtsDb.findOne({ _id: inderted._id })];
            case 2:
                addedDebt = _a.sent();
                if (!addedDebt) {
                    res.status(500).json({ message: 'Something went wrong' });
                    return [2 /*return*/];
                }
                res.status(201).json(addedDebt);
                return [2 /*return*/];
        }
    });
}); });
app.put('/api/debts/:id', passport.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var debtId, updatedDebt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debtId = req.params.id;
                if (!debtId) {
                    res.status(400).json({ message: 'Bad Request' });
                    return [2 /*return*/];
                }
                if (!req.body.name || !req.body.debt) {
                    res.status(400).json({ message: 'Bad params' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, debtsDb.update({ id: debtId }, __assign({ id: debtId }, req.body))];
            case 1:
                updatedDebt = _a.sent();
                if (updatedDebt) {
                    res.json({ message: 'Successfully updated' });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [2 /*return*/];
        }
    });
}); });
app["delete"]('/api/debts/:id', passport.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var debtId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debtId = req.params.id;
                if (!debtId) {
                    res.status(400).json({ message: 'Bad Request' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, debtsDb.remove({ id: debtId }, {})];
            case 1:
                result = _a.sent();
                if (result) {
                    res.status(200).json({ message: 'Successfully deleted' });
                }
                else {
                    res.status(500).json({ message: 'Something went wrong' });
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/search', passport.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, regex, debts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query.searchData;
                if (!query) {
                    res.status(400).json({ message: 'Bad request' });
                }
                regex = new RegExp("" + query, 'i');
                return [4 /*yield*/, debtsDb.find({ name: regex })];
            case 1:
                debts = _a.sent();
                res.send(debts);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, salt, encryptedPassword, existedUser, inderted, addedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.body.email || !req.body.password) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                _a = req.body, email = _a.email, password = _a.password;
                salt = generateSalt();
                encryptedPassword = encryptPassword(password, salt);
                return [4 /*yield*/, usersDb.findOne({ email: email })];
            case 1:
                existedUser = _b.sent();
                if (existedUser) {
                    res.status(409).json({ message: 'User already exists' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usersDb.insert({
                        email: email,
                        password: encryptedPassword,
                        id: generateId(),
                        salt: salt
                    })];
            case 2:
                inderted = _b.sent();
                return [4 /*yield*/, usersDb.findOne({ _id: inderted._id })];
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
app.post('/api/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, result, payload;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.body.email || !req.body.password) {
                    res.status(400).json({ message: 'Bad request' });
                    return [2 /*return*/];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, usersDb.findOne({ email: email })];
            case 1:
                user = _b.sent();
                result = checkThePassword(password, user.password, user.salt);
                if (result) {
                    payload = {
                        id: user.id,
                        email: user.email
                    };
                    jwt.sign(payload, 'idkwhatisitsorry', { expiresIn: 36000 }, function (err, token) {
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
                    res.status(401).json({ message: '123' });
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/users/:id', passport.authenticate('jwt', { session: false }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var debtId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debtId = req.params.id;
                if (!debtId) {
                    res.status(400).json({ message: 'Bad Request' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usersDb.findOne({ id: debtId })];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ message: "Can't find the user" });
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/check-the-token', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: 'Success' });
});
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});
// Start the app by listening on the default Heroku port
app.listen(PORT, function () {
    console.log("Server launched on port " + PORT);
    console.log("Check this on http://localhost:" + PORT + "/");
});
var generateId = function () { return '_' + Math.random().toString(36).substr(2, 9); };
var encryptPassword = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};
var checkThePassword = function (insertedPassword, databasePassword, databaseSalt) {
    var hash = encryptPassword(insertedPassword, databaseSalt);
    return hash === databasePassword;
};
var generateSalt = function () { return crypto.randomBytes(16).toString('hex'); };

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
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;
// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
app.use(bodyParser.json());
// DB
var debts = [
    {
        id: 1,
        name: 'Alex',
        debt: 1000,
        loanDate: '2020-11-04T17:00:00.000Z',
        paymentDate: '2020-11-10T17:00:00.000Z'
    },
    {
        id: 2,
        name: 'Ivan',
        debt: 1500,
        loanDate: '2020-11-04T17:00:00.000Z',
        paymentDate: '2020-11-10T17:00:00.000Z'
    },
    {
        id: 3,
        name: 'Alfred',
        debt: 100,
        loanDate: '2020-11-04T17:00:00.000Z'
    },
    {
        id: 4,
        name: 'John',
        debt: 1500,
        loanDate: '2020-11-04T17:00:00.000Z',
        paymentDate: '2020-05-22T17:00:00.000Z'
    },
];
// API
app.get('/api/debts', function (req, res) {
    res.json(debts);
});
app.get('/api/debts/:id', function (req, res) {
    var debtId = Number(req.params.id);
    if (!debtId) {
        res.status(400).send('Bad Request');
        return;
    }
    console.log(debtId);
    var debt = debts.find(function (el) { return el.id === debtId; });
    if (debt) {
        res.json(debt);
    }
    else {
        res.status(404).send('Not found');
    }
});
app.post('/api/debt', function (req, res) {
    if (req.body.name && req.body.debt) {
        var id_1 = Date.now();
        var debt = __assign(__assign({}, req.body), { id: id_1 });
        debts.push(debt);
        var addedDebt = debts.find(function (el) { return el.id === id_1; });
        if (addedDebt) {
            res.status(201).json(addedDebt);
            return;
        }
    }
    res.status(400).send('Bad params');
});
app.put('/api/debt/:id', function (req, res) {
    var debtId = Number(req.params.id);
    if (!debtId) {
        res.status(400).send('Bad Request');
        return;
    }
    var debt = debts.find(function (el) { return el.id === debtId; });
    var debtIndex = debts.indexOf(debt);
    if (!debt) {
        res.status(404).send('Not found');
        return;
    }
    if (!req.body.name || !req.body.debt) {
        res.status(400).send('Bad params');
    }
    debt = __assign(__assign({}, req.body), { id: debtId });
    debts[debtIndex] = __assign({}, debt);
    var addedDebt = debts.find(function (el) { return el.id === debtId; });
    if (!addedDebt) {
        res.status(400).send('Something went wrong');
    }
    res.json(addedDebt);
});
app["delete"]('/api/debt/:id', function (req, res) {
    var debtId = Number(req.params.id);
    if (!debtId) {
        res.status(400).send('Bad Request');
        return;
    }
    var debt = debts.find(function (el) { return el.id === debtId; });
    var debtIndex = debts.indexOf(debt);
    if (!debt) {
        res.status(404).send('Not found');
        return;
    }
    debts.splice(debtIndex, 1);
    res.status(200).send('Successfully deleted');
});
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});
// Start the app by listening on the default Heroku port
app.listen(PORT, function () {
    console.log("Server launched on port " + PORT);
});

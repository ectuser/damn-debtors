"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
// Serve only the static files form the dist directory
app.use(express.static('./dist/damn-debtors'));
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
];
// API
app.get('/api/debts', function (req, res) {
    res.json(debts);
});
app.get('/api/debts/:id', function (req, res) {
    var debtId = Number(req.params.id);
    console.log(debtId);
    var debt = debts.find(function (el) { return el.id === debtId; });
    if (debt) {
        res.json(debt);
    }
    else {
        res.status(404).send('Not found');
    }
});
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/damn-debtors/' });
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

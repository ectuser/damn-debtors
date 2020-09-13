const express = require('express')
const app = express()
const port = 3000

let debtors = [
    {name: "Alex", debt: 1000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "Ivan", debt: 1500, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "John", debt: 2000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "Alfred", debt: 30000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")}
];

app.get('/api/get-debtors', (req, res) => {
  let result = JSON.stringify({debtors})
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

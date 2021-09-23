const express = require('express')

const employeeDB = require('./db/employees.json')
const bossDB = require('./db/boss.json')
const rolesDB = require('./db/roles.json')

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.json(employeeDB)
})

app.get('/user/:id', (req, res) => {
    const chosenOne = employeeDB.filter((employee) => employee.id == req.params.id)
    res.send(chosenOne)
})

app.get('/role/:id', (req, res) => {
    const chosenRole = rolesDB.filter((role) => role.id == req.params.id)
    res.send(chosenRole)
})

app.get('/boss/:id', (req, res) => {
    const chosenBoss = bossDB.filter((boss) => boss.id == req.params.id)
    res.send(chosenBoss)
})

app.listen(port, () => {
    console.log(`i'm executing at ${port}`)
})
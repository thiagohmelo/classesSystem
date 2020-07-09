const express = require('express')
const routes = express.Router()
const professors = require ('./app/controllers/professors')
const students = require ('./app/controllers/students')

routes.get('/', function(req, res) {
    return res.redirect('/professors')
})


routes.get('/professors', professors.index)
routes.get('/professors/create', professors.create)
routes.get('/professors/:id', professors.show)
routes.get('/professors/:id/edit', professors.edit)
routes.post('/professors', professors.post)
routes.put('/professors', professors.put)
routes.delete('/professors', professors.delete)




routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes
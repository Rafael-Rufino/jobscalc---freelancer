// biblioteca pra node pra contruir o servidor 
const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController  = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')



//rotas
routes.get('/', DashboardController.index)

routes.get('/job',JobController.create)
//salvar dados
routes.post('/job', JobController.save)

routes.get('/job/:id',JobController.show)

routes.post('/job/:id',JobController.update)

routes.post('/job/delete/:id',JobController.delete)

routes.get('/profile',ProfileController.index)

routes.post('/profile',ProfileController.update)

// exportar o arquivos de rotas
module.exports = routes;
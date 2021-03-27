// biblioteca pra node pra contruir o servidor 
const express = require('express');
const routes = express.Router()

// variavel ambiente pegando os arquivos static
const views = __dirname + "/views/"



const profile ={
    name: "Rafael",
    avatar: "https://scontent.fnat16-1.fna.fbcdn.net/v/t1.0-9/107738734_3028137827312498_1482817804595466080_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=s7g1nAsNRDUAX85oq7b&_nc_ht=scontent.fnat16-1.fna&oh=06f508f128b734e3227eab4b0df00322&oe=60828CDB",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4



}




//rotas
routes.get('/', (req, res) => {
    res.render(views + "index")
} )
routes.get('/job', (req, res) => {
    res.render(views + "job")
} )
routes.get('/job/edit', (req, res) => {
    res.render(views + "job-edit")
} )
routes.get('/profile', (req, res) => {
    res.render(views + "profile", {profile})
} )



// exportar o arquivos de rotas
module.exports = routes;
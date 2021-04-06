const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// usando template engine
server.set('view engine', 'ejs')

//habilitar arquivos static (middewares)
server.use(express.static("public"))
// enviando os dados
server.use(express.urlencoded({extended: true}))
// routes
server.use(routes)

server.listen(3000, () =>
console.log('start running')
)

const vendasRouter = require('./router/vendas_router');
const bonusRouter = require('./router/bonus_router')
const express = require('express'); 
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use(vendasRouter)
server.use(bonusRouter)

server.listen(8080, function() {
  console.log('Server Listesening on port 8080')
})
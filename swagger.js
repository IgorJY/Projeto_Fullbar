const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/router/bonus_router','./src/router/vendas_router']

swaggerAutogen(outputFile, endpointsFiles)
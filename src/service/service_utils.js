const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_URL,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
});

module.exports = db
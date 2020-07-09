const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'Melo421089',
    host:  'localhost',
    port: 5432,
    database: 'classmanager'
})
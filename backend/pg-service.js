const {Pool, Client} = require('pg');  

class PgService {

    constructor(pool, client) {
        this.pool = pool;
        this.client = client;
    }
    
    CreatePool() {
        const pool = new this.pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'Sa12324047',
            port: '5432'
        });
        return pool;
    }

    CreateClient() {
        const client = new this.client({
            user: 'postgres',
            host: 'localhost',
            database: 'users',
            password: 'Sa12324047',
            port: '5432'
        });
        return client;
    }
}

module.exports = PgService;

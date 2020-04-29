const pgp = require('pg-promise')();

import { connectionObject } from '../constants/dbConstants';

class PgConnector {
    public conn;
    constructor(){
        this.conn = pgp(connectionObject);
    }

    public many(query){
        return this.conn.many(query)
        .then( data => {
            return data;
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

    public any(query){
        return this.conn.any(query)
        .then( data => {
            return data;
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

    public one(query){
        return this.conn.one(query)
        .then( data => {
            return data;
        })
        .catch(err => {
            console.log('Error', err);
        });
    }
}

export default PgConnector;

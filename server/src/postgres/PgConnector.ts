import pgPromise from 'pg-promise';
import parallel from 'async/parallel';

import debugLib from 'debug';

const debug = debugLib('PgConnector');

import { connectionObject, paginationConfig } from '../constants/dbConstants';

/**
 * This class manages the connection with database.
 * This class implements the core methods to query database.
 */

class PgConnector {
    public conn;
    private pgp;
    constructor() {
        const initOptions = {
            error(error, e) {
                if (e.cn) {
                    debug('Error in connection', error.message);
                }
            }
        };
        this.pgp = pgPromise(initOptions);
        this.conn = this.pgp(connectionObject);
        this.onConnect();
    }

    public disconnect(){
        // shut down the connections
        this.pgp.end();
    }

    public onConnect() {
        return this.conn.connect()
            .then(obj => {
                // Check the server version 
                const serverVersion = obj.client.serverVersion;
                debug('using db version: %d',serverVersion);
                obj.done(); // success, release the connection;
                return serverVersion;
            })
            .catch(error => {
                debug('Error in connecting db', error.message);
                return error;
            });
    }

    private processDbResult(result, options) {
        return result.then(data => {
            if (options && options.pagination && options.pageNumber > 0 && options.pageSize > 0) {
                data = data.slice((options.pageNumber - 1) * options.pageSize, options.pageNumber * options.pageSize);
            }
            return data;
        });
    }

    public many(query, options) {

        if (options && options.pagination) {
            // apply default limit 
            let limit = paginationConfig.pageNumber * paginationConfig.pageSize;

            if (options.pageNumber > 0 && options.pageSize > 0) {
                limit = options.pageSize * options.pageNumber;
            }
            query += ` limit ${limit}`;
        }

        return this.processDbResult(this.conn.many(query), options);
    }

    public any(query, options) {

        if ( options && options.pagination ){
            // apply default limit 
            let limit = paginationConfig.pageNumber * paginationConfig.pageSize;

            if ( options.pageNumber > 0 && options.pageSize > 0) {
                limit = options.pageSize * options.pageNumber;
            }
            query+= ` limit ${limit}`;
        }

        return this.processDbResult(this.conn.any(query), null);
    }

    public one(query) {
        return this.processDbResult(this.conn.one(query), null);
    }

    // Multi insert
    public multiInsert(queries:Array<string>) {
        let promise = new Promise((resolve, reject) => {
            parallel(queries.map((query) => {
                return (callback) => {
                    this.any(query, null).then(data => {
                        callback(null, data);
                    }).catch(err => {
                        callback(null, err);
                    }
                );
                }
            }),
            (err, results) =>{
                if(err){
                    reject(err);
                }else{
                    resolve('success');
                }
            });
        });
       return promise;
   }

}

export default PgConnector;

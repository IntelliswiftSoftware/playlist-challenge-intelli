import pgPromise from 'pg-promise';
import parallel from 'async/parallel';

import { connectionObject, paginationConfig } from '../constants/dbConstants';


class PgConnector {
    public conn;
    private pgp;
    constructor() {
        const initOptions = {
            error(error, e) {
                if (e.cn) {
                    console.log('CN:', e.cn);
                    console.log('EVENT:', error.message || error);
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
                // Can check the server version here (pg-promise v10.1.0+):
                const serverVersion = obj.client.serverVersion;
                obj.done(); // success, release the connection;
                return serverVersion;
            })
            .catch(error => {
                console.log('Error', error.message || error);
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

    private multiInsert(queries:Array<string>) {
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

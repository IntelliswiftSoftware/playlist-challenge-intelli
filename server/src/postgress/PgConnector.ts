import pgPromise from 'pg-promise';
import { connectionObject, paginationConfig } from '../constants/dbConstants';
// import async from 'async-parallel';
import parallel from 'async/parallel';

class PgConnector {
    public conn;
    constructor() {
        const initOptions = {
            error(error, e) {
                if (e.cn) {
                    console.log('CN:', e.cn);
                    console.log('EVENT:', error.message || error);
                }
            }
        };
        const pgp = pgPromise(initOptions);
        this.conn = pgp(connectionObject);
        this.onConnect();
    }

    public onConnect() {
        this.conn.connect()
            .then(obj => {
                // Can check the server version here (pg-promise v10.1.0+):
                const serverVersion = obj.client.serverVersion;
                obj.done(); // success, release the connection;
            })
            .catch(error => {
                console.log('Error', error.message || error);
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

    public any(query) {
        return this.processDbResult(this.conn.any(query), null);
    }

    public one(query) {
        return this.processDbResult(this.conn.one(query), null);
    }

    private multiInsert(queries:Array<string>) {
        let promise = new Promise((resolve, reject) => {
            parallel(queries.map((query) => {
                return (callback) => {
                    this.any(query).then(data => {
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

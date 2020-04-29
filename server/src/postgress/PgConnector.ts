import pgPromise from 'pg-promise';
import { connectionObject } from '../constants/dbConstants';

class PgConnector {
    public conn;
    constructor(){
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

    public onConnect(){
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

    private processDbResult(result) {
        return result.then(data => {
            return data;
        }).catch(err => {
            console.log('Error', err);
        });
    }

    public many(query) {
        return this.processDbResult(this.conn.many(query));
    }

    public any(query) {
        return this.processDbResult(this.conn.any(query));
    }

    public one(query) {
        return this.processDbResult(this.conn.one(query));
    }
}

export default PgConnector;

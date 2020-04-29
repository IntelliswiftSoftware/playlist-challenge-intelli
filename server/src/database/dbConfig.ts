import pgPromise from 'pg-promise';
const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: 'song_playlist',
  user: 'postgres',
  password: 'root',
  poolSize: 50, //defult poolSize  10
  poolIdleTimeout: 10000 //connetion idle time out
};

const initOptions = {
  error(error, e) {
    if (e.cn) {
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  }
};

const pgp = pgPromise(initOptions);
const db = pgp(connectionOptions);

db.connect()
  .then(obj => {
    // Can check the server version here (pg-promise v10.1.0+):
    const serverVersion = obj.client.serverVersion;

    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

export default db;
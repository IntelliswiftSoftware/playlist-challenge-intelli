import { expect } from 'chai';


import PgConnector from '../postgres/PgConnector';
import SongCategories from '../postgres/SongCategories';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let songCategoriesDao;

const connectionObject = {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE_NAME,
    user: process.env.RDS_DATABASE_USER,
    password: process.env.RDS_DATABASE_PASSWORD,
    max: parseInt(process.env.RDS_MAX_CONNECTIONS) || 30,
    poolIdleTimeout: parseInt(process.env.RDS_POOL_TIMEOUT) || 10000
}

describe('Test Songs methods', () => {

    before(function(done) {
        pgConn =  new PgConnector(connectionObject);
        songCategoriesDao = new SongCategories(pgConn);  
        done();
    });

    after(function(done) {
      
        pgConn.disconnect();
        done();
    });

    it('should get all moods new song', (done) => { 
        songCategoriesDao.getAllmoods().then(data => {
            expect( Array.isArray(data) && data.length > 0 && data.findIndex( c => c.isMood === false) === -1 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

   it('should get all Genres', (done) => { 
    songCategoriesDao.getAllGenres().then(data => {
        expect( Array.isArray(data) && data.length > 0 && data.findIndex( c => c.isMood === true) === -1).to.equal(true);
        done();
    }).catch(err => {
        expect( typeof err ).to.equal(undefined);
        done();
    })
});

   

});
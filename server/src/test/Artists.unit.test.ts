import { expect } from 'chai';


import PgConnector from '../postgres/PgConnector';
import Artists from '../postgres/Artists';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let artistsDao;

const connectionObject = {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE_NAME,
    user: process.env.RDS_DATABASE_USER,
    password: process.env.RDS_DATABASE_PASSWORD,
    max: parseInt(process.env.RDS_MAX_CONNECTIONS) || 30,
    poolIdleTimeout: parseInt(process.env.RDS_POOL_TIMEOUT) || 10000
}


describe('Test Artists methods', () => {

    before(function(done) {
        pgConn =  new PgConnector(connectionObject);
        artistsDao = new Artists(pgConn);  
        done();
    });

    after(function(done) {
        pgConn.disconnect();
        done();
    });

    it('should get artist details ', (done) => { 
        artistsDao.getArtists(1).then(data => {
            expect( Array.isArray(data) && data.length === 1 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

   it('should get list of artists', (done) => { 
    artistsDao.getArtists().then(data => {
        expect( Array.isArray(data) && data.length > 0 ).to.equal(true);
        done();
    }).catch(err => {
        expect( typeof err ).to.equal(undefined);
        done();
    })
});

   

});
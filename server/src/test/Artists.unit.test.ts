import { expect } from 'chai';


import PgConnector from '../postgress/PgConnector';
import Artists from '../postgress/Artists';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let artistsDao;

describe('Test Artists methods', () => {

    before(function(done) {
        pgConn =  new PgConnector();
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
import { expect } from 'chai';


import PgConnector from '../postgres/PgConnector';
import SongCategories from '../postgres/SongCategories';
import { connectionObject } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let songCategoriesDao;

describe('Test SongCategories methods', () => {

    before(function(done) {
        pgConn =  PgConnector.getInstance(connectionObject);
        songCategoriesDao = new SongCategories(pgConn);  
        done();
    });

    after(function(done) {
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
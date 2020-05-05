import { expect } from 'chai';


import PgConnector from '../postgress/PgConnector';
import SongCategories from '../postgress/SongCategories';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let songCategoriesDao;
let songObject = {
    title:'unittestsong',
    artistId: 1,
    source:'unit test source',
    genreId: 1,
    duration:22,
    imageId:1
}


describe('Test Songs methods', () => {

    before(function(done) {
        pgConn =  new PgConnector();
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
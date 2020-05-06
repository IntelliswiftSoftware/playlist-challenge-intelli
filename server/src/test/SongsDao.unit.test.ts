import { expect } from 'chai';


import PgConnector from '../postgres/PgConnector';
import Songs from '../postgres/Songs';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let songDao;
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
        songDao = new Songs(pgConn);  
        done();
    });

    after(function(done) {
        const query = `delete from ${tableNames.SONGS} where title = '${songObject.title}' `;
        pgConn.any(query).then(data => {
            pgConn.disconnect();
            done();
        }).catch(err => {
            pgConn.disconnect();
            done();
        });
    });

    it('should insert new song', (done) => { 
        songDao.insertSong(songObject.title, songObject.artistId, songObject.imageId, songObject.duration,
        songObject.source, songObject.genreId, null).then(data => {
            expect( Array.isArray(data) && data.length === 0 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

   it('should search new song', (done) => { 
    songDao.searchSongs(1, songObject.title).then(data => {
        expect( Array.isArray(data) && data.length !== 0 && data[0].title === songObject.title  ).to.equal(true);
        done();
    }).catch(err => {
        expect( typeof err ).to.equal(undefined);
        done();
    })
});

   

});
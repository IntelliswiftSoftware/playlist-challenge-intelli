import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';


process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;



describe('Test QueryMaps configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
      
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('UserType should have all required fields', (done) => {
        let keys = Object.keys(queryMaps.UserType.getFields());
        expect( keys.indexOf('id') !== -1 ).to.equal(true);
        expect( keys.indexOf('firstname') !== -1 ).to.equal(true);
        expect( keys.indexOf('username') !== -1 ).to.equal(true);
        expect( keys.indexOf('lastname') !== -1 ).to.equal(true);
        expect( keys.indexOf('age') !== -1 ).to.equal(true);
        expect( keys.indexOf('gender') !== -1 ).to.equal(true);
        expect( keys.indexOf('playlists') !== -1 ).to.equal(true);
        expect( keys.indexOf('image') !== -1 ).to.equal(true);
        expect( keys.indexOf('likedsongs') !== -1 ).to.equal(true);
        expect( keys.indexOf('recentsongs') !== -1 ).to.equal(true);
        done();
   });

    it('UserType check type of fields', (done) => {
        expect( queryMaps.UserType.getFields().id.type+'').to.equal('ID');
        expect( queryMaps.UserType.getFields().firstname.type+'').to.equal('String');
        expect( queryMaps.UserType.getFields().username.type+'').to.equal('String');
        expect( queryMaps.UserType.getFields().lastname.type+'').to.equal('String');
        expect( queryMaps.UserType.getFields().age.type+'').to.equal('Int');
        expect( queryMaps.UserType.getFields().gender.type+'').to.equal('String');
        expect( queryMaps.UserType.getFields().playlists.type+'').to.equal('[Playlist]');
        expect( queryMaps.UserType.getFields().image.type+'').to.equal('Image');
        expect( queryMaps.UserType.getFields().likedsongs.type+'').to.equal('[Song]');
        expect( queryMaps.UserType.getFields().recentsongs.type+'').to.equal('[Song]');
        done();
    });


    it('PlaylistType should have all required fields', (done) => {
        let keys = Object.keys(queryMaps.PlaylistType.getFields());
        expect( keys.indexOf('id') !== -1 ).to.equal(true);
        expect( keys.indexOf('title') !== -1 ).to.equal(true);
        expect( keys.indexOf('imageid') !== -1 ).to.equal(true);
        expect( keys.indexOf('userid') !== -1 ).to.equal(true);
        expect( keys.indexOf('image') !== -1 ).to.equal(true);
        expect( keys.indexOf('songs') !== -1 ).to.equal(true);
        done();
   });

    it('PlaylistType check type of fields', (done) => {
        expect( queryMaps.PlaylistType.getFields().id.type+'').to.equal('ID');
        expect( queryMaps.PlaylistType.getFields().title.type+'').to.equal('String');
        expect( queryMaps.PlaylistType.getFields().imageid.type+'').to.equal('Int');
        expect( queryMaps.PlaylistType.getFields().userid.type+'').to.equal('Int');        
        expect( queryMaps.PlaylistType.getFields().image.type+'').to.equal('Image');
        expect( queryMaps.PlaylistType.getFields().songs.type+'').to.equal('[Song]');
        done();
    });


    it('SongType should have all required fields', (done) => {
        let keys = Object.keys(queryMaps.SongType.getFields());
        expect( keys.indexOf('id') !== -1 ).to.equal(true);
        expect( keys.indexOf('artistid') !== -1 ).to.equal(true);
        expect( keys.indexOf('imageid') !== -1 ).to.equal(true);
        expect( keys.indexOf('duration') !== -1 ).to.equal(true);
        expect( keys.indexOf('source') !== -1 ).to.equal(true);
        expect( keys.indexOf('title') !== -1 ).to.equal(true);
        expect( keys.indexOf('genreid') !== -1 ).to.equal(true);
        expect( keys.indexOf('isLiked') !== -1 ).to.equal(true);
        expect( keys.indexOf('image') !== -1 ).to.equal(true);
        expect( keys.indexOf('artist') !== -1 ).to.equal(true);
        done();
   });

    it('SongType check type of fields', (done) => {
        expect( queryMaps.SongType.getFields().id.type+'').to.equal('ID');
        expect( queryMaps.SongType.getFields().source.type+'').to.equal('String');
        expect( queryMaps.SongType.getFields().title.type+'').to.equal('String');
        expect( queryMaps.SongType.getFields().imageid.type+'').to.equal('Int');
        expect( queryMaps.SongType.getFields().artistid.type+'').to.equal('Int');  
        expect( queryMaps.SongType.getFields().genreid.type+'').to.equal('Int');
        expect( queryMaps.SongType.getFields().duration.type+'').to.equal('Int');          
        expect( queryMaps.SongType.getFields().image.type+'').to.equal('Image');
        expect( queryMaps.SongType.getFields().artist.type+'').to.equal('Artist');
        expect( queryMaps.SongType.getFields().isLiked.type+'').to.equal('Boolean');
        done();
    });
});
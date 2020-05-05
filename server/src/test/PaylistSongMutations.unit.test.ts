import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import PaylistSongMutations from '../graphql/PaylistSongMutations';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let playlistsongsMutations;
let addSongsToPlayList;
let deleteSongsFromPlaylist;


describe('Test PaylistSongMutations configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        playlistsongsMutations = new PaylistSongMutations(objectFactory, queryMaps);
        addSongsToPlayList =  playlistsongsMutations.getAddSongToPlaylist();
        deleteSongsFromPlaylist =  playlistsongsMutations.getDeleteSongFromPlaylist();
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('AddSongToPlaylist should have all required args', (done) => {
        let keys = Object.keys(addSongsToPlayList.args);
        expect( keys.indexOf('songId') !== -1 ).to.equal(true);
        expect( keys.indexOf('playlistId') !== -1 ).to.equal(true);
       done();
   });

    it('AddSongToPlaylist check type of args', (done) => {
        expect(addSongsToPlayList.args.songId.type+'' ).to.equal('String!');
        expect( addSongsToPlayList.args.playlistId.type+'' ).to.equal('String!');
        done();
    });


    it('deleteSongsFromPlaylist should have all required args', (done) => {
        let keys = Object.keys(deleteSongsFromPlaylist.args);
        expect( keys.indexOf('songId') !== -1 ).to.equal(true);
        expect( keys.indexOf('playlistId') !== -1 ).to.equal(true);
       done();
   });

    it('deleteSongsFromPlaylist check type of args', (done) => {
        expect(deleteSongsFromPlaylist.args.songId.type+'' ).to.equal('String!');
        expect( deleteSongsFromPlaylist.args.playlistId.type+'' ).to.equal('String!');
        done();
    });

});
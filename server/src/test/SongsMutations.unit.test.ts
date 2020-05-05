import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import SongsMutations from '../graphql/SongsMutations';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let songsMutations;


describe('Test SongsMutations configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        songsMutations = new SongsMutations(objectFactory, queryMaps);
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('should have all required args', (done) => {
        let keys = Object.keys(songsMutations.getPlaySong().args);
        expect( keys.indexOf('userId') !== -1 ).to.equal(true);
        expect( keys.indexOf('songId') !== -1 ).to.equal(true);
        expect( keys.indexOf('playCount') !== -1 ).to.equal(true);
       done();
   });

    it('check type of args', (done) => {
        expect(songsMutations.getPlaySong().args.userId.type+'' ).to.equal('Int!');
        expect( songsMutations.getPlaySong().args.songId.type+'' ).to.equal('Int!');
        expect( songsMutations.getPlaySong().args.playCount.type+'' ).to.equal('Int!');
        done();
    });

});
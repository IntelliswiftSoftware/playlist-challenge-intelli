import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import PlaylistMutations from '../graphql/PlaylistMutations';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let playlistMutations;
let addPlaylist;



describe('Test UserMutations configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        playlistMutations = new PlaylistMutations(objectFactory, queryMaps);
        addPlaylist =  playlistMutations.getAddPlaylist();
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('addPlaylist should have all required args', (done) => {
        let keys = Object.keys(addPlaylist.args);
        expect( keys.indexOf('title') !== -1 ).to.equal(true);
        expect( keys.indexOf('userId') !== -1 ).to.equal(true);
      
       done();
   });

    it('addPlaylist check type of args', (done) => {
        expect(addPlaylist.args.title.type+'' ).to.equal('String!');
        expect(addPlaylist.args.userId.type+'' ).to.equal('Int!');
        done();
    });

    

});
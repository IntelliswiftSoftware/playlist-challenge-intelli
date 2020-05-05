import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import MutationQuery from '../graphql/MutationQuery';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let mutationQuery;


describe('Test MutationQuery configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        mutationQuery = new MutationQuery( queryMaps, objectFactory);
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('should have all required fields', (done) => {
        let keys = Object.keys(mutationQuery.getMutationQuery().getFields());
        expect( keys.indexOf('addUser') !== -1 ).to.equal(true);
        expect( keys.indexOf('deleteUser') !== -1 ).to.equal(true);
        expect( keys.indexOf('addPlaylist') !== -1 ).to.equal(true);
        expect( keys.indexOf('addSongToPlaylist') !== -1 ).to.equal(true);
        expect( keys.indexOf('deleteSongFromPlaylist') !== -1 ).to.equal(true);
        expect( keys.indexOf('playSong') !== -1 ).to.equal(true);
        done();
    });

});
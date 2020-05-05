import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import RootQuery from '../graphql/RootQuery';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let rootQuery;


describe('Test RootQuery configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        rootQuery = new RootQuery( queryMaps, objectFactory);
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('should have all required fields', (done) => {
        let keys = Object.keys(rootQuery.getRootQuery().getFields());
        expect( keys.indexOf('user') !== -1 ).to.equal(true);
        expect( keys.indexOf('playlists') !== -1 ).to.equal(true);
        expect( keys.indexOf('images') !== -1 ).to.equal(true);
        expect( keys.indexOf('artists') !== -1 ).to.equal(true);
        expect( keys.indexOf('mostlikedSongs') !== -1 ).to.equal(true);
        expect( keys.indexOf('newReleaseSongs') !== -1 ).to.equal(true);
        expect( keys.indexOf('songByMood') !== -1 ).to.equal(true);
        expect( keys.indexOf('allmoods') !== -1 ).to.equal(true);
        expect( keys.indexOf('songsByGenre') !== -1 ).to.equal(true);
        expect( keys.indexOf('allGenres') !== -1 ).to.equal(true);
        expect( keys.indexOf('search') !== -1 ).to.equal(true);
        expect( keys.indexOf('searchPlayList') !== -1 ).to.equal(true);
        done();
    });

});
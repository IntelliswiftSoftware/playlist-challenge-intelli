import { expect } from 'chai';

import AppSchema from '../graphql/AppSchema';
import ObjectFactory from '../util/ObjectFactory';

process.env.NODE_ENV = 'test';

let appSchema;
let objectFactory;


describe('Test AppSchema configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        appSchema = new AppSchema(objectFactory);
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('should create schema', (done) => {
          expect(typeof appSchema.getSchema() ).to.equal('object');
          expect( appSchema.getSchema().getQueryType().toString() ).to.equal('RootQueryType');
          expect( appSchema.getSchema().getMutationType().toString() ).to.equal('Mutation');
          done();
    });

    it('schema query should have correct Types', (done) => {
        let keys = Object.keys(appSchema.getSchema().getTypeMap());
        expect( keys.indexOf('Playlist') !== -1 ).to.equal(true);
        expect( keys.indexOf('Song') !== -1 ).to.equal(true);
        expect( keys.indexOf('Image') !== -1 ).to.equal(true);
        expect( keys.indexOf('Artist') !== -1 ).to.equal(true);
        expect( keys.indexOf('SongCategories') !== -1 ).to.equal(true);
        expect( keys.indexOf('CountType') !== -1 ).to.equal(true);
        done();
    });

 
});
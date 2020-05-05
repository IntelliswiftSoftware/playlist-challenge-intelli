import { expect } from 'chai';


import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from '../graphql/QueryMaps';
import UserMutations from '../graphql/UserMutations';

process.env.NODE_ENV = 'test';

let queryMaps;
let objectFactory;
let userMutations;
let addUser;
let deleteUser;


describe('Test UserMutations configuration', () => {

    before(function(done) {
        objectFactory =  new ObjectFactory();
        queryMaps = new QueryMaps(objectFactory);
        userMutations = new UserMutations(objectFactory, queryMaps);
        addUser =  userMutations.getAddUser();
        deleteUser =  userMutations.getDeleteUser();
        done();
    });

    after(function(done) {
        objectFactory.destroy();
        done();
    });

    it('addUser should have all required args', (done) => {
        let keys = Object.keys(addUser.args);
        expect( keys.indexOf('username') !== -1 ).to.equal(true);
        expect( keys.indexOf('firstname') !== -1 ).to.equal(true);
        expect( keys.indexOf('lastname') !== -1 ).to.equal(true);
        expect( keys.indexOf('age') !== -1 ).to.equal(true);
        expect( keys.indexOf('gender') !== -1 ).to.equal(true);
        expect( keys.indexOf('password') !== -1 ).to.equal(true);
       done();
   });

    it('addUser check type of args', (done) => {
        expect(addUser.args.username.type+'' ).to.equal('String!');
        expect(addUser.args.firstname.type+'' ).to.equal('String!');
        expect(addUser.args.lastname.type+'' ).to.equal('String!');
        expect(addUser.args.age.type+'' ).to.equal('Int!');
        expect(addUser.args.gender.type+'' ).to.equal('String!');
        expect(addUser.args.password.type+'' ).to.equal('String!');
        done();
    });


    it('deleteUser should have all required args', (done) => {
        let keys = Object.keys(deleteUser.args);
        expect( keys.indexOf('id') !== -1 ).to.equal(true);
       done();
   });

    it('deleteUser check type of args', (done) => {
        expect(deleteUser.args.id.type+'' ).to.equal('ID!');
        done();
    });

});
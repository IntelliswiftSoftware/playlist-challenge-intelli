import { expect } from 'chai';


import PgConnector from '../postgres/PgConnector';
import { tableNames } from '../constants/dbConstants';

process.env.NODE_ENV = 'test';

let pgConn;
let userObject = {
    username:'unittestuser1',
    firstname:'unit test name',
    lastname:'unit test lastname',
    password:'test',
    age:22,
    gender:'Male',
    imageId:1
}


describe('Test PgConnector methods', () => {

    before(function(done) {
        pgConn =  new PgConnector();      
        done();
    });

    after(function(done) {
        const query = `delete from ${tableNames.USERS} where username = '${userObject.username}' `;
        pgConn.any(query);
        pgConn.disconnect();
        done();
    });

    it('should connect the database', (done) => { 
       pgConn.onConnect().then(data => {
           data = parseFloat(data);
           expect( isNaN(data) ).to.equal(false);
           done();
       })

   });

   
   it('any method should return an empty array', (done) => { 
        pgConn.any(`select * from ${tableNames.USERS} where username = '' `).then(data => {
            expect( Array.isArray(data) && data.length === 0 ).to.equal(true);
            done();
        }).catch(err => {
            console.log(err);
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });


   it('many method should return an error', (done) => { 
        pgConn.many(`select * from ${tableNames.USERS} where username = '' `).then(data => {
            done();
        }).catch(err => {
            expect( err.message ).to.equal("No data returned from the query.");
            done();
        })
    });

    it('any method should delete user', (done) => {
        const query = `delete from ${tableNames.USERS} where username = '${userObject.username}' `;
        pgConn.any(query).then(data => {
            expect( Array.isArray(data) && data.length === 0 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

    it('any method should insert new user', (done) => {
        const query = `INSERT INTO ${tableNames.USERS} (username, firstname, lastname, age, gender, password, imageId, createDate)
        VALUES ( '${userObject.username}','${userObject.firstname}', '${userObject.lastname}', ${userObject.age}, '${userObject.gender}', 
        '${userObject.password}', ${userObject.imageId}, now())`;

        pgConn.any(query).then(data => {
            expect( Array.isArray(data) && data.length === 0 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

   it('one method should selet user', (done) => {
        const query = `select * from ${tableNames.USERS} where username = '${userObject.username}' `;
        pgConn.one(query).then(data => {
            expect( data.username ).to.equal(userObject.username);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
    });

});
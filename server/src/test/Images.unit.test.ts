import { expect } from 'chai';

import { tableNames } from '../constants/dbConstants';
import PgConnector from '../postgres/PgConnector';
import Images from '../postgres/Images';


process.env.NODE_ENV = 'test';

let pgConn;
let imageDao;
let imageObject = {
    low:'unit test image low',
    mid: 'unit test image mid',
    high:'unit test image high',
    basepath: 'test basepath'
}

const connectionObject = {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE_NAME,
    user: process.env.RDS_DATABASE_USER,
    password: process.env.RDS_DATABASE_PASSWORD,
    max: parseInt(process.env.RDS_MAX_CONNECTIONS) || 30,
    poolIdleTimeout: parseInt(process.env.RDS_POOL_TIMEOUT) || 10000
}

describe('Test Images methods', () => {

    before(function(done) {
        pgConn =  new PgConnector(connectionObject);
        imageDao = new Images(pgConn);  
        done();
    });

    after(function(done) {
        const query = `delete from ${tableNames.IMAGES} where low = '${imageObject.low}' `;
        pgConn.any(query).then(data => {
            pgConn.disconnect();
            done();
        }).catch(err => {
            pgConn.disconnect();
            done();
        });
    });

    it('should insert image ', (done) => { 
        imageDao.insertImage(imageObject.low, imageObject.mid, imageObject.high, imageObject.basepath).then(data => {
            expect( Array.isArray(data) ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
   });

   it('should get list of images', (done) => { 
            imageDao.getImages().then(data => {
            expect( Array.isArray(data) && data.length > 0 ).to.equal(true);
            done();
        }).catch(err => {
            expect( typeof err ).to.equal(undefined);
            done();
        })
    });

});
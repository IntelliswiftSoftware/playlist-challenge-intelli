import { expect } from 'chai';


import PgConnector from '../postgress/PgConnector';
import Images from '../postgress/Images';


process.env.NODE_ENV = 'test';

let pgConn;
let imageDao;
let imageObject = {
    low:'unit test image low',
    mid: 'unit test image mid',
    high:'unit test image high',
}


describe('Test Artists methods', () => {

    before(function(done) {
        pgConn =  new PgConnector();
        imageDao = new Images(pgConn);  
        done();
    });

    after(function(done) {
        pgConn.disconnect();
        done();
    });

    it('should insert image ', (done) => { 
        imageDao.insertImage(imageObject.low, imageObject.mid, imageObject.high).then(data => {
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
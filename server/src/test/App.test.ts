import { expect } from 'chai';
import request  from 'request';

import App from '../App';

process.env.NODE_ENV = 'test';

let server;
let serverPort = 3000;

describe('Test App configuration', () => {

    before(function() {
        server = new App().app.listen(serverPort, (err) => {}) 
    });

    after(function(done) {
        server.close(done);
    });

    it('should return welcome message', (done) => {
       
        request({
            method: 'GET',
            url: 'http://localhost:' + serverPort
          }, (err, r, body) => {
            expect(body).to.equal('Hello Welcome to playlist challenge.');
            done()
          })

    });

});
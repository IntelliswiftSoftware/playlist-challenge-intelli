import { expect } from 'chai';
import axios  from 'axios';

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
        
        axios.get('http://localhost:' + serverPort)
        .then( (response) => {
          expect(response.data).to.equal('Hello Welcome to playlist challenge.');
          done();
        })
        .catch( (error) => {
          expect(error).to.equal(null);
          done();
        })
    
    });

});
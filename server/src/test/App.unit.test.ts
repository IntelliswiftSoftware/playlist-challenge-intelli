import { expect } from 'chai';
import axios  from 'axios';

import App from '../App';

process.env.NODE_ENV = 'test';

let server;
let serverPort = 3000;
let app;

describe('Test App configuration', () => {

    before((done) => {
        app =  new App();
        server = app.app.listen(serverPort, (err) => {
          done();
        }) 
    });

    after((done) => {
        server.close(done);
        app.destroy();
    });

    it('should return welcome message', (done) => {
        
        axios.get('http://localhost:' + serverPort)
        .then( (response) => {
          expect(response.data).to.equal('Hello Welcome to playlist challenge.');
          done();
        }).catch(err => {
          done();
        });
    
    });

    it('should return 401 status', (done) => {
      axios.post('http://localhost:' + serverPort+'/login', {
        username: 'invalid',
        password: 'invalid'
      })
      .then(function (response) {
        expect(response.status).to.equal(401);
        done();
      })
      .catch(function (error) {
        done();
      });
  });

});
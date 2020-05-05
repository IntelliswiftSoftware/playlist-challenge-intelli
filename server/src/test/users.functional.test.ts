import { expect } from 'chai';
import axios  from 'axios';

import App from '../App';

let server;
let serverPort = 3000;
let app;
let API_URL = 'http://localhost:' + serverPort+'/songPlaylist';



describe('Test Users functionalities', () => {

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

    it('should return user details', (done) => {
        let id = 1;
        axios.post(API_URL, {
            query: `query{
              user(id: ${id}){
                id
                firstname
                lastname
              }
            }`
            },{
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.data.data.user.id == id).to.equal(true);
                done();
            }).catch(function (error) {
                console.log(error)
                done();
            });
    
    });
});


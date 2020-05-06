import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import AppSchema from './graphql/AppSchema';
import ObjectFactory from './util/ObjectFactory';

/**
 * This class configures the express app and creates a grapql endpoint.
 */

class App {
  public app
  private objectFactory: ObjectFactory;

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());

    const corsOptions = {
        origin: "*",
        methods: "GET,POST"
    };

    this.app.use(cors(corsOptions));

    this.objectFactory = new ObjectFactory();

    this.app.use('/songPlaylist', expressGraphQL({
      schema: new AppSchema(this.objectFactory).getSchema(),
      graphiql: true
    }));

    this.mountRoutes();
  }

  public destroy(){
    this.objectFactory.destroy();
  }

  private mountRoutes (): void {

    this.app.get('',(req, res)=>{
      res.send('Hello Welcome to playlist challenge.');
    })

    this.app.post('/login',(req, res) => {
      const username = req.body.username;
      const password =  req.body.password;

      res.setHeader('Content-Type','application/json');

      this.objectFactory.getUsersDao().getUserByIdPassword(username, password).then(data => {
         if ( data && typeof data === 'object' && data.username === req.body.username ) {
            delete data.createdate;
            res.end(JSON.stringify(data));
         } else {
            res.statusCode = 401;
            res.end( JSON.stringify({ message: 'Invalid Username and password' }))
         }
       }).catch( err => {
         if ( err.message === 'No data returned from the query.') {
          res.statusCode = 401;
          res.end( JSON.stringify({ message: 'Invalid Username and password' }))
         } else {
          res.statusCode = 503;
          res.end( JSON.stringify({ message: 'Internal server error'}))
         }
       });
      })
  }
}

export default App;
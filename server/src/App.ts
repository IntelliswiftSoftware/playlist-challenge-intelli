import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';

import PlaylistSchema from './graphql/PlaylistSchema';

class App {
  public app

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());

    this.app.use('/songPlaylist', expressGraphQL({
      schema: new PlaylistSchema().getSchema(),
      graphiql: true
    }));
    
    this.mountRoutes();
  }

  private mountRoutes (): void {

    this.app.get('',(req, res)=>{
      res.send('Hello Welcome to playlist challenge.');
    })
    
  }
}

export default App;
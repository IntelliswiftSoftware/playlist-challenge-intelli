import express from 'express';
import bodyParser from 'body-parser';

import myPlaylistApiSchema from './graphql/myPlaylistApi';

class App {
  public app

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/myPlaylistApi', myPlaylistApiSchema);
    this.mountRoutes()
  }

  private mountRoutes (): void {

    this.app.get('',(req, res)=>{
      res.send('Hello Welcome to playlist challenge.');
    })
    
  }
}

export default App;
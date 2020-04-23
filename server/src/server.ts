import cluster from 'cluster';
import os from 'os';
import debugLib from 'debug';

import App from './App';

const app = new App().app;
const debug = debugLib('server');
const port = process.env.PORT || 3000

if (cluster.isMaster) {

    console.log(`Starting server on port: ${port}`)

    debug('Creating %n workers ', os.cpus().length);

    for ( let i=0; i < os.cpus().length; i++ ) {
        cluster.fork();
    }

    cluster.on('exit', (w)=>{
        debug(`Worker ${w.id} exited`);
    });

    cluster.on('online',(w)=>{
        debug(`Worker ${w.id}  is online`);
    });

    cluster.on('listening',(w) => {
        debug(`Worker ${w.id}  is listening`);
    });

} else {

    app.listen(port, (err) => {
    if (err) {
        return debug(err)
    }
    return debug(`server is listening on ${port}`)
    })
   
}
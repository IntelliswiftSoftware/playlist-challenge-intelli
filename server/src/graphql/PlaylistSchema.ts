import { GraphQLSchema } from 'graphql';

import DbConnector from '../postgress/PgConnector';
import RootQuery from './RootQuery';
import MutationQuery from './MutationQuery';
import QueryMaps from './QueryMaps';

class PlaylistSchema {
    private db;
    private queryMaps;
    private schema;

    constructor(){
        this.db = new DbConnector();
        this.queryMaps = new QueryMaps(this.db);
        this.setSchema();
    }

    private setSchema(){
        if ( !this.schema ) {

            this.schema = new GraphQLSchema({
                query: new RootQuery(this.db, this.queryMaps).getRootQuery(),
                mutation: new MutationQuery(this.db, this.queryMaps).getMutationQuery()
            })
        }
      
    }
    
    public getSchema(){
        return this.schema;
    }


}


export default PlaylistSchema;
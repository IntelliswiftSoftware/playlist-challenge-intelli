import { GraphQLSchema } from 'graphql';

import DbConnector from '../postgress/PgConnector';
import RootQuery from './RootQuery';
import MutationQuery from './MutationQuery';
import QueryMaps from './QueryMaps';
import Users from '../postgress/Users';
import Playlist from '../postgress/Playlist';

class PlaylistSchema {
    private db;
    private queryMaps;
    private schema;
    private users;
    private playlist;

    constructor(){
        this.db = new DbConnector();
        this.users =  new Users(this.db);
        this.playlist = new Playlist(this.db);
        this.queryMaps = new QueryMaps(this.db,  this.playlist);
        this.setSchema();
    }

    private setSchema(){
        if ( !this.schema ) {

            this.schema = new GraphQLSchema({
                query: new RootQuery(this.db, this.queryMaps, this.users, this.playlist).getRootQuery(),
                mutation: new MutationQuery(this.db, this.queryMaps, this.users).getMutationQuery()
            })
        }

    }

    public getSchema(){
        return this.schema;
    }
}


export default PlaylistSchema;
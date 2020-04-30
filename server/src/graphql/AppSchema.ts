import { GraphQLSchema } from 'graphql';

import RootQuery from './RootQuery';
import MutationQuery from './MutationQuery';
import QueryMaps from './QueryMaps';


import ObjectFactory from '../util/ObjectFactory';

class AppSchema {
    private db;
    private queryMaps;
    private schema;
    private users;
    private playlist;

    constructor(objectFactory: ObjectFactory){
        this.db = objectFactory.getDbInstance();
        this.users =  objectFactory.getUsersDao();
        this.playlist = objectFactory.getPlayListsDao();
        this.queryMaps = new QueryMaps(objectFactory);
        this.setSchema();
    }

    private setSchema(){
        if ( !this.schema ) {

            this.schema = new GraphQLSchema({
                query: new RootQuery( this.queryMaps, this.users, this.playlist).getRootQuery(),
                mutation: new MutationQuery( this.queryMaps, this.users).getMutationQuery()
            })
        }

    }

    public getSchema(){
        return this.schema;
    }
}


export default AppSchema;
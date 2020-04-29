import {
    GraphQLObjectType, GraphQLID
  } from 'graphql';

import QueryMaps from './QueryMaps';

class RootQuery {

    private db; 
    private queryMaps;
    private rootQuery;

    constructor(db, queryMaps: QueryMaps){
        this.db = db;
        this.queryMaps = queryMaps;
        this.setRootQuery();
    }

    public getRootQuery(){
        return this.rootQuery;
    }

    private setRootQuery(){
        this.rootQuery = new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                user:{
                    type: this.queryMaps.UserType,
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => {
                        const query = `SELECT * FROM users WHERE id = ${args.id}`;
                        return this.db.one(query);
                    }
                },
                playlists:{
                    type: this.queryMaps.PlaylistType,
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => {
                        const query = `SELECT * FROM playlist WHERE playlistid = ${args.id}`;
                        return this.db.one(query);
                    }
                }
            }
        });
    }
}

export default RootQuery;
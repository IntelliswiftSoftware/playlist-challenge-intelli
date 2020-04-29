import {
    GraphQLObjectType, GraphQLID
  } from 'graphql';

import QueryMaps from './QueryMaps';
import Users from '../postgress/Users';
import Playlist from '../postgress/Playlist';
class RootQuery {

    private db; 
    private queryMaps;
    private rootQuery;
    private users;
    private playlist;

    constructor(db, queryMaps: QueryMaps, users: Users, playlist: Playlist){
        this.db = db;
        this.queryMaps = queryMaps;
        this.users = users;
        this.playlist = playlist;
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
                    resolve:(parentValue, args) => this.users.getUserById(args.id)
                },
                playlists:{
                    type: this.queryMaps.PlaylistType,
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.playlist.getPlaylistByPlaylistid(args.id)
                }
            }
        });
    }
}

export default RootQuery;
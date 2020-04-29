import {
    GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,
    GraphQLInt, GraphQLList
  } from 'graphql';

  import Playlist from '../postgress/Playlist';

class QueryMaps {
    public UserType;
    public PlaylistType;
    private db;
    private playlist;

    constructor(db, playlist: Playlist){
        this.db = db;
        this.playlist = playlist;
        this.UserType = new GraphQLObjectType({
            name: 'User',
            fields: ()=>({
                id: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                playlists: {
                    type: new GraphQLList(this.PlaylistType),
                    resolve: (parentValue, args) => this.playlist.getPlaylistByUserId(parentValue.id)
                }
            })
        });

        this.PlaylistType = new GraphQLObjectType({
            name: 'Playlist',
            fields: ()=>({
                playlistid: { type: GraphQLID },
                title: { type: GraphQLString },
                isprivate: { type: GraphQLBoolean}
            })
        })

    }
}

export default QueryMaps;

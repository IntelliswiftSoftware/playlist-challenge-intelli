import {
    GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,
    GraphQLInt, GraphQLList
  } from 'graphql';


import ObjectFactory from '../util/ObjectFactory';

class QueryMaps {
    public UserType;
    public PlaylistType;
    private SongType;
    private objectFactory: ObjectFactory;

    constructor(objectFactory: ObjectFactory){
        this.objectFactory = objectFactory;
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
                    resolve: (parentValue, args) => this.objectFactory.getPlayListsDao().getPlaylistByUserId(parentValue.id)
                }
            })
        });
 
        this.PlaylistType = new GraphQLObjectType({
            name: 'Playlist',
            fields: ()=>({
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                imageId: { type: GraphQLInt },
                userId: { type: GraphQLInt },
                songs: {
                    type: new GraphQLList(this.SongType),
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getPlayListSongs(parentValue.id)
                }
            })
        })

        this.SongType = new GraphQLObjectType({
            name: 'Song',
            fields: ()=>({
                id: { type: GraphQLID },
                artistId: { type: GraphQLInt },
                imageId: { type: GraphQLString },
                duration: { type: GraphQLInt },
                source: { type: GraphQLString },
                genreId: { type: GraphQLString }
            })
        });

    }
}

export default QueryMaps;

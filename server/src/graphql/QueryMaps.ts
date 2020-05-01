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
    public ReturnMessageType;
    public ImageType;

    constructor(objectFactory: ObjectFactory){
        this.objectFactory = objectFactory;
        this.UserType = new GraphQLObjectType({
            name: 'User',
            fields: ()=>({
                id: { type: GraphQLID },
                firstname: { type: GraphQLString },
                username: { type: GraphQLString },
                lastname: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                playlists: {
                    type: new GraphQLList(this.PlaylistType),
                    resolve: (parentValue, args) => this.objectFactory.getPlayListsDao().getPlaylistByUserId(parentValue.id)
                },
                image: {
                    type: this.ImageType,
                    resolve: (parentValue, args) => this.objectFactory.getUsersDao().getImageByUserId(parentValue.id)
                }
            })
        });
 
        this.PlaylistType = new GraphQLObjectType({
            name: 'Playlist',
            fields: ()=>({
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                imageid: { type: GraphQLInt },
                userid: { type: GraphQLInt },
                songs: {
                    type: new GraphQLList(this.SongType),
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getPlayListSongs(parentValue.id)
                },
                image: {
                    type: this.ImageType,
                    resolve: (parentValue, args) => this.objectFactory.getPlayListsDao().getImageByPlaylistId(parentValue.id)
                }
            })
        })

        this.SongType = new GraphQLObjectType({
            name: 'Song',
            fields: ()=>({
                id: { type: GraphQLID },
                artistid: { type: GraphQLInt },
                imageid: { type: GraphQLString },
                duration: { type: GraphQLInt },
                source: { type: GraphQLString },
                genreid: { type: GraphQLString }
            })
        });

        this.ReturnMessageType = new GraphQLObjectType({
            name: 'ReturnObject',
            fields: ()=>({
                message: { type: GraphQLID },
                success: { type: GraphQLBoolean }
            })
        });

        this.ImageType = new GraphQLObjectType({
            name: 'Image',
            fields: ()=>({
                id: { type: GraphQLID },
                low: { type: GraphQLString },
                mid: { type: GraphQLString },
                high: { type: GraphQLString }
            })
        });

    }
}

export default QueryMaps;

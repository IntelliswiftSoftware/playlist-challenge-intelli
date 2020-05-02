import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';

import QueryMaps from './QueryMaps';
import ObjectFactory from '../util/ObjectFactory';

class RootQuery {

    private queryMaps;
    private rootQuery;
    private objectFactory: ObjectFactory;

    constructor(queryMaps: QueryMaps, objectFactory: ObjectFactory){
        this.queryMaps = queryMaps;
        this.objectFactory = objectFactory;
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
                    resolve:(parentValue, args) => this.objectFactory.getUsersDao().getUserById(args.id)
                },
                playlists:{
                    type: this.queryMaps.PlaylistType,
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.objectFactory.getPlayListsDao().getPlaylistByPlaylistid(args.id)
                },
                images:{
                    type: new GraphQLList(this.queryMaps.ImageType),
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.objectFactory.getImagesDao().getImages(args.id)
                },
                artists:{
                    type: new GraphQLList(this.queryMaps.ArtistType),
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.objectFactory.getArtistsDao().getArtists(args.id)
                },
                mostPlayedsongs:{
                    type: new GraphQLList(this.queryMaps.SongType),
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getMostPlayedSongs()
                },
                mostlikedSongs:{
                    type: new GraphQLList(this.queryMaps.SongType),
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getmostlikedSongs()
                },
                newReleaseSongs:{
                    type: new GraphQLList(this.queryMaps.SongType),
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getNewReleaseSongs()
                },
                songByMood:{
                    type: new GraphQLList(this.queryMaps.SongType),
                    args: { id: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getSongByMood(args.id)
                },
                allmoods:{
                    type: new GraphQLList(this.queryMaps.SongCategories),
                    resolve: (parentValue, args) => this.objectFactory.getSongCategoriesDao().getAllmoods()
                },
                songsByGenre:{
                    type: new GraphQLList(this.queryMaps.SongType),
                    args: { genreId: { type: GraphQLID }},
                    resolve: (parentValue, args) => this.objectFactory.getSongsDao().getSongByGenre(args.genreId)
                },
                allGenres:{
                    type: new GraphQLList(this.queryMaps.SongCategories),
                    resolve: (parentValue, args) => this.objectFactory.getSongCategoriesDao().getAllGenres()
                },
            }
        });
    }
}

export default RootQuery;
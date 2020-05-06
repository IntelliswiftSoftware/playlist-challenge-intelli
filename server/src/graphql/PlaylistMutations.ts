import { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from './QueryMaps';
import PlaylistObject from '../interfaces/PlaylistObject';

/**
 * This class manages the playlist mutations.
 */

class PlaylistMutations {

    private objectFactory: ObjectFactory;
    private queryMaps: QueryMaps;

    constructor(objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.objectFactory = objectFactory;
        this.queryMaps = queryMaps;
    }

    getAddPlaylist(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                title: { type: new GraphQLNonNull( GraphQLString )},
                userId: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parentValue, args)  => {
                const newPlaylist: PlaylistObject = {
                    ...args,
                    imageId: 1 // TODO: image upload feature 
                }
                return this.objectFactory.getPlayListsDao().insertPlaylist(newPlaylist);
            }
        }
    }

    getDeletePlaylist(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                playlistId: { type: new GraphQLNonNull( GraphQLInt )},
                userId: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parentValue, args)  => {
                const newPlaylist: PlaylistObject = {
                    ...args,
                    imageId: 1 // TODO: image upload feature 
                }
                return this.objectFactory.getPlayListsDao().deletePlaylist(args.playlistId, args.userId);
            }
        }
    }

    
}

export default PlaylistMutations;
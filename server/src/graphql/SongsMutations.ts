import { GraphQLInt, GraphQLNonNull } from 'graphql';

import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from './QueryMaps';


/**
 * This class manages the song mutations.
 */

class SongsMutations {

    private objectFactory: ObjectFactory;
    private queryMaps: QueryMaps;

    constructor(objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.objectFactory = objectFactory;
        this.queryMaps = queryMaps;
    }

    getPlaySong(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                userId: { type: new GraphQLNonNull( GraphQLInt )},
                songId: { type: new GraphQLNonNull( GraphQLInt )},
                playCount: { type: new GraphQLNonNull( GraphQLInt )}
            },
            resolve: (parentValue, args)  => {
                return this.objectFactory.getSongsDao().insertPlaySong(args.userId, args.songId, args.playCount);
            }
        }
    }

    getLikeSong(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                userId: { type: new GraphQLNonNull( GraphQLInt )},
                songId: { type: new GraphQLNonNull( GraphQLInt )},
            },
            resolve: (parentValue, args)  => {
                return this.objectFactory.getSongsDao().insertLikeSong(args.userId, args.songId);
            }
        }
    }
}


export default SongsMutations;
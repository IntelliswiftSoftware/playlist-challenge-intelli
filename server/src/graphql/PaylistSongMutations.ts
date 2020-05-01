import { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from './QueryMaps';
import PlaylistSongsObject from '../interfaces/PlaylistSongsObject';

class PaylistSongMutations {

    private objectFactory: ObjectFactory;
    private queryMaps: QueryMaps;

    constructor(objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.objectFactory = objectFactory;
        this.queryMaps = queryMaps;
    }

    getAddSongToPlaylist(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                songId: { type: new GraphQLNonNull( GraphQLInt )},
                playlistId: { type: new GraphQLNonNull( GraphQLInt )}
            },
            resolve: (parentValue, args)  => {
                const newPlaylistSong: PlaylistSongsObject = {
                    ...args
                }
                return this.objectFactory.getPlaylistSongsDao().insertPlaylistSongs(newPlaylistSong);
            }
        }
    }

    getDeleteSongFromPlaylist(){
        return {
            type: this.queryMaps.ReturnMessageType,
            args: {
                songId: { type: new GraphQLNonNull( GraphQLInt )},
                playlistId: { type: new GraphQLNonNull( GraphQLInt )}
            },
            resolve: (parentValue, args) => this.objectFactory.getPlaylistSongsDao().deletePlaylistSong(args.songId, args.playlistId)
        }
    }
}

export default PaylistSongMutations;
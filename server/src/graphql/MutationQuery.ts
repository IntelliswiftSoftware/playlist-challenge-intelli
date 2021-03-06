import { GraphQLObjectType } from 'graphql';

import QueryMaps from './QueryMaps';
import ObjectFactory from '../util/ObjectFactory';
import UserMutations from './UserMutations';
import PlaylistMutations from './PlaylistMutations';
import PaylistSongMutations from './PaylistSongMutations';
import SongsMutations from './SongsMutations';


/**
 * This class manages the all mutations.
 * This class call mutations as per type.
 */

class MutationQuery {

    private mutationQuery;
    private userMutations: UserMutations;
    private playlistMutations: PlaylistMutations;
    private paylistSongMutations: PaylistSongMutations;
    private songsMutations : SongsMutations;

    constructor( objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.userMutations = new UserMutations(objectFactory, queryMaps);
        this.playlistMutations = new PlaylistMutations(objectFactory, queryMaps);
        this.paylistSongMutations = new PaylistSongMutations(objectFactory, queryMaps);
        this.songsMutations = new SongsMutations(objectFactory, queryMaps);
        this.setMutationQuery();
    }

    public getMutationQuery(){
        return this.mutationQuery;
    }

    private setMutationQuery(){
        this.mutationQuery = new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                addUser: this.userMutations.getAddUser(),
                deleteUser: this.userMutations.getDeleteUser(),
                addPlaylist: this.playlistMutations.getAddPlaylist(),
                addSongToPlaylist: this.paylistSongMutations.getAddSongToPlaylist(),
                deleteSongFromPlaylist: this.paylistSongMutations.getDeleteSongFromPlaylist(),
                playSong: this.songsMutations.getPlaySong(),
                likeSong: this.songsMutations.getLikeSong(),
                unlikeSong: this.songsMutations.getDislikeSong(),
                deletePlaylist: this.playlistMutations.getDeletePlaylist(),
            }
        })
    }
}

export default MutationQuery;
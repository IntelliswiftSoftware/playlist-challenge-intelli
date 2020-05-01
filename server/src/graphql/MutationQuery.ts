import { GraphQLObjectType } from 'graphql';

import QueryMaps from './QueryMaps';
import ObjectFactory from '../util/ObjectFactory';
import UserMutations from './UserMutations';
import PlaylistMutations from './PlaylistMutations';
import PaylistSongMutations from './PaylistSongMutations';


class MutationQuery {

    private mutationQuery;
    private queryMaps: QueryMaps;
    private userMutations: UserMutations;
    private playlistMutations: PlaylistMutations;
    private paylistSongMutations: PaylistSongMutations;

    constructor( objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.queryMaps = queryMaps;
        this.userMutations = new UserMutations(objectFactory, queryMaps);
        this.playlistMutations = new PlaylistMutations(objectFactory, queryMaps);
        this.paylistSongMutations = new PaylistSongMutations(objectFactory, queryMaps);
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
                deleteSongFromPlaylist: this.paylistSongMutations.getDeleteSongFromPlaylist()
            }
        })
    }
}

export default MutationQuery;
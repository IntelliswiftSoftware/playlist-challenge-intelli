import { GraphQLObjectType } from 'graphql';

import QueryMaps from './QueryMaps';
import ObjectFactory from '../util/ObjectFactory';
import UserMutations from './UserMutations';



class MutationQuery {

    private mutationQuery;
    private queryMaps: QueryMaps;
    private userMutations: UserMutations

    constructor( objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.queryMaps = queryMaps;
        this.userMutations = new UserMutations(objectFactory, queryMaps);
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
                deleteUser: this.userMutations.getDeleteUser()
            }
        })
    }
}

export default MutationQuery;
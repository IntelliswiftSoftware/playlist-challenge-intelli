import {
    GraphQLObjectType, GraphQLID, GraphQLString,
    GraphQLInt, GraphQLNonNull
  } from 'graphql';

import QueryMaps from './QueryMaps';
import Users from '../postgress/Users';

class MutationQuery {

    private queryMaps;
    private mutationQuery;
    private users;

    constructor( queryMaps: QueryMaps, users: Users){
        this.queryMaps = queryMaps;
        this.users = users;
        this.setMutationQuery();
    }

    public getMutationQuery(){
        return this.mutationQuery;
    }

    private setMutationQuery(){
        this.mutationQuery = new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                addUser: {
                    type:  this.queryMaps.UserType,
                    args: {
                        id: { type: new GraphQLNonNull( GraphQLID )},
                        firstname: { type: new GraphQLNonNull( GraphQLString )},
                        lastname: { type: new GraphQLNonNull( GraphQLString )},
                        age: { type: GraphQLInt },
                        gender: { type: GraphQLString }
                    },
                    resolve: (parentValue, args)  => this.users.insertUser(args)
                },
                deleteUser: {
                    type: this.queryMaps.UserType,
                    args: {
                        id: { type: new GraphQLNonNull( GraphQLID )}
                    },
                    resolve: (parentValue, args) => this.users.deleteUser(args)
                }
            }
        })
    }
}

export default MutationQuery;
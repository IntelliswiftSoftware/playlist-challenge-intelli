import { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

import ObjectFactory from '../util/ObjectFactory';
import QueryMaps from './QueryMaps';
import UserObject from '../interfaces/UserObject';

/**
 * This class manages the user mutations.
 */

class UserMutations {

    private objectFactory: ObjectFactory;
    private queryMaps: QueryMaps;

    constructor(objectFactory: ObjectFactory, queryMaps: QueryMaps){
        this.objectFactory = objectFactory;
        this.queryMaps = queryMaps;
    }

    getAddUser(){
        return {
            type:  this.queryMaps.ReturnMessageType,
            args: {
                username: { type: new GraphQLNonNull( GraphQLString )},
                firstname: { type: new GraphQLNonNull( GraphQLString )},
                lastname: { type: new GraphQLNonNull( GraphQLString )},
                age: { type: new GraphQLNonNull( GraphQLInt )},
                gender: { type: new GraphQLNonNull( GraphQLString )},
                password: { type: new GraphQLNonNull( GraphQLString )}
            },
            resolve: (parentValue, args)  => {
                const newUser: UserObject = {
                    ...args,
                    imageId: 1
                }
                return this.objectFactory.getUsersDao().insertUser(newUser);
            }
        }
    }

    getDeleteUser(){
        return {
            type: this.queryMaps.ReturnMessageType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )}
            },
            resolve: (parentValue, args) => this.objectFactory.getUsersDao().deleteUser(args.id)
        }
    }
}


export default UserMutations;
import {
    GraphQLObjectType, GraphQLID, GraphQLString,
    GraphQLInt, GraphQLNonNull
  } from 'graphql';

import QueryMaps from './QueryMaps';

class MutationQuery {
    private db;
    private queryMaps;
    private mutationQuery;

    constructor(db, queryMaps: QueryMaps){
        this.db = db;
        this.queryMaps = queryMaps;
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
                    resolve: (parentValue, { id, firstname, lastname, age, gender })  => {
                        const query = `INSERT INTO users (id, firstname, lastname, age, gender) VALUES (${id}, '${firstname}', '${lastname}', ${age}, '${gender}')`;
                        return this.db.any(query);
                    }
                },
                deleteUser: {
                    type: this.queryMaps.UserType,
                    args: {
                        id: { type: new GraphQLNonNull( GraphQLID )} 
                    },
                    resolve: (parentValue, args) => {
                        const query = `DELETE FROM users WHERE id=${args.id}`;
                        return this.db.any(query);
                    }
                }
            }
        })
    }
}

export default MutationQuery;
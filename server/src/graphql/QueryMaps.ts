import {
    GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,
    GraphQLInt, GraphQLList
  } from 'graphql';


class QueryMaps {
    public UserType;
    public PlaylistType;
    private db;

    constructor(db){
        
        this.db = db;

        this.UserType = new GraphQLObjectType({
            name: 'User',
            fields: ()=>({
                id: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                playlists: {
                    type: new GraphQLList(this.PlaylistType),
                    resolve: (parentValue, args) => {
                        const query = `SELECT * FROM playlist WHERE userid = ${ parentValue.id }`;
                        return this.db.many(query);
                    }
                }
            })
        });

        this.PlaylistType = new GraphQLObjectType({
            name: 'Playlist',
            fields: ()=>({
                playlistid: { type: GraphQLID },
                title: { type: GraphQLString },
                isprivate: { type: GraphQLBoolean}
            })
        })
        
    }


}

export default QueryMaps;

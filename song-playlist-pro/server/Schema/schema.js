const graphql = require('graphql');
const connectionString = 'postgresql://postgres:root@localhost:5432/song_playlist';    //process.env.DATABASE_URL;
const pgp = require('pg-promise')();
const db = {}
db.conn = pgp(connectionString);

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
  } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        playlists: {
            type: new GraphQLList(PlaylistType),
            resolve(parentValue, args) {
                console.log('parentvalue ', parentValue)
                const query = `SELECT * FROM playlist WHERE userid = ${ parentValue.id }`;
                return db.conn.many(query)
                    .then( data => {
                        return data;
                    })
                    .catch(err => {
                        return 'The error is ', err;
                    });
            }
        }
    })
})

const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: ()=>({
        playlistid: { type: GraphQLID },
        title: { type: GraphQLString },
        isprivate: { type: GraphQLBoolean}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user:{
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE id = ${args.id}`;
                return db.conn.one(query)
                    .then( data => {
                        return data;
                    })
                    .catch( err => {
                        return 'The error is ', err;
                    });
            }
        },
        playlists:{
            type: PlaylistType,
            args: { id: { type: GraphQLID }},
            resolve(parentValue, args) {
                const query = `SELECT * FROM playlist WHERE playlistid = ${args.id}`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'The error is ', err;
                    });
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )},
                firstname: { type: new GraphQLNonNull( GraphQLString )},
                lastname: { type: new GraphQLNonNull( GraphQLString )},
                age: { type: GraphQLInt },
                gender: { type: GraphQLString }
            },
            resolve(parentValue, { id, firstname, lastname, age, gender }) {
                const query = `INSERT INTO users (id, firstname, lastname, age, gender) VALUES (${id}, '${firstname}', '${lastname}', ${age}, '${gender}')`;
                console.log(query);
                return db.conn.any(query)
                    .then(data => {
                        console.log('data ', data)
                        //return data;
                    })
                    .catch(err => {
                        console.log('error', err)
                        return 'The error is ', err;
                    });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID )} 
            },
            resolve(parentValue, args){
                const query = `DELETE FROM users WHERE id=${args.id}`;
                console.log(query)
                return db.conn.any(query)
                    .then(data => {
                        console.log('data', data);
                    })
                    .catch(err => {
                        console.log('error', err)
                        return 'The error is ', err;
                    });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
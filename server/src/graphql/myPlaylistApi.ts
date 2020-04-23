import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

const myPlaylistApiSchema = graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            songsPlayList: [String!]!
        }
        type RootMutation {
            createPlayList(name: String):String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        songsPlayList: () => {
            return ['Song 1', 'Song 2', 'Song 3', 'Song 4'];
        },
        createPlayList: (args) => {
            const songName = args.name;
            return songName;
        }
    },
    graphiql: true    
  });

export default myPlaylistApiSchema;
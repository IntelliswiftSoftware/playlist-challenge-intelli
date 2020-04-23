const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
    '/myPlaylistApi', 
    graphqlHttp({
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
      })
    );

app.listen(3000);
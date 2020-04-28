const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./Schema/schema');

const app = express();

app.use('/songPlaylist', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is listening at PORT 4000');
})
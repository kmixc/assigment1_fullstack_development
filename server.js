// Assignment 1
// Oliver Kmiec
// 101247765

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers.js')

const { ApolloServer } = require('apollo-server-express')

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb has connected')
}).catch(err => {
    console.log('Mongodb is not connected')
});

const apolloServer = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

const app = express();
app.use(express.json());
app.use('*', cors());

apolloServer.applyMiddleware({ app })

//Start listen 
app.listen({ port: process.env.PORT }, () =>
    console.log("server running at " + process.env.PORT));
const mySchema = require('./schema/main')
const { MongoClient } = require('mongodb')
const assert = require ('assert')

const graphqlHTTP = require('express-graphql')
const express = require('express')
const app = express()


MONGO_URL = 'mongodb://localhost:27017/test'

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err)
    console.log('Connected to MongoDB server')

    app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: { db },
        // explore GraphQL queries and mutations- ctrl + space gives query autocomplete 
        graphiql: true
    }))

    app.listen(3000, () => 
        console.log('running express.js on port 300')
    )
})



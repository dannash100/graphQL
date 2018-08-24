const { graphql } = require('graphql')
const readline = require('readline')

const mySchema = require('./schema/main')

const { MongoClient } = require('mongodb')
const assert = require ('assert')

MONGO_URL = 'mongodb://localhost:27017/test'

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err)
    console.log('Connected to MongoDB server')

    const rli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    rli.question('Client Request: ', inputQuery => {
        // pass reference to db object to graphql(), third argument is the rootValue, which gets passed as first argument to resolver function on top level type
        graphql(mySchema, inputQuery, {}, { db }).then(result => {
            console.log('Server Answer:', result.data)
            db.close(() => rli.close())
        })
    })
})



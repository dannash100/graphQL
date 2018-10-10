const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
  } = require('graphql')

const {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray 
} = require('graphql-relay')

let connectionArgsWithSearch = connectionArgs
connectionArgsWithSearch.searchTerm = { type: GraphQLString }

const QuoteType = new GraphQLObjectType({
  name: "Quote",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: obj => obj._id.toString()
    },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  })
})

const { connectionType: QuotesConnectionType } =
    connectionDefinitions({
      name: 'Quote',
      nodeType: QuoteType
    })

const QuotesLibraryType = new GraphQLObjectType({
  name: 'QuotesLibrary',
  fields: () => ({
    quotesConnection: {
      type: QuotesConnectionType,
      description: 'A list of the quotes in the database',
      args: connectionArgsWithSearch,
      resolve: (_, args, { db }) => {
        let findParams = {}
        if (args.searchTerm) {
          findParams.text = new RegExp(args.searchTerm, 'i')
        }
        return connectionFromPromisedArray(
          db.collection('quotes').find(findParams).toArray(),
          args
        )
      }
    }
  })
})

const quotesLibrary = {}

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    quotesLibrary: {
      type: QuotesLibraryType,
      description: "The Quotes Library",
      resolve: () => quotesLibrary 
    }
  })
})

const mySchema = new GraphQLSchema({
  query: queryType,
})

module.exports = mySchema


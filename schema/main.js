const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLEnumType
  } = require('graphql')
  
  
  
  
  const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      usersCount: {
        type: GraphQLInt,
        // destructured db instead of context.db
        description: "Total number of users in database",
        resolve: (_, args, { db }) =>
          db.collection('users').count()
      }
    }
  })
  
  const mySchema = new GraphQLSchema({
    query: queryType,
  })
  
  module.exports = mySchema
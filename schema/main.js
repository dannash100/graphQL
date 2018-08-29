const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require('graphql')


const exampleEmployee = {
    firstName: 'Dan',
    lastName: 'Nash'
}

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        name: {
            type: GraphQLString,
            args: {
                upperCase: { type: GraphQLBoolean }
            },
            resolve: (obj, args) => {
                let fullName = `${obj.firstName} ${obj.lastName}`
                return args.upperCase ? 
                    fullName.toUpperCase() : fullName
            }
        },
        boss: { type: EmployeeType }
    })
})

const roll = () => Math.floor(6 * Math.random()) + 1

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        exampleEmployee: {
            type: EmployeeType,
            resolve: () => exampleEmployee
        },
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        diceRoll: {
            type: new GraphQLList(GraphQLInt),
            description: '**simulate** a dice roll determined by count',
            args: {
                count: {
                    type: GraphQLInt,
                    defaultValue: 2
                }
            },
            //first argument _ represents the parent object and it's undefined on the first root-level queries
            resolve: (_, args) => {
                let rolls = []
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll())
                }
                return rolls
            }
        },
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
    query: queryType
})

module.exports = mySchema
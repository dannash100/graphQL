# Notes on Learning GraphQL by Samer Buna, 2016, Packt Publishing

### to run: $mongod && node index.js
### explore GraphQL queries and mutations with graphiql on http://localhost:3000/graphql  ctrl + space gives query autocomplete 

## To Do
* replace relay with Apollo
* more mongodb

## GraphQL Schema

* define capabilities of the server- types and directives

* schema object instance of *GraphQLSchema* the starting root-field- the constructor expects a configuration object
* accepts queries and optional mutation properties as instances of *GraphQLObjectType*
```javascript
class GraphQLSchema {
    constructor(config: GraphQLSchemaConfig)
}
```
* accepts queries and optional mutation properties as instances of *GraphQLObjectType*
```javascript

type GraphQLSchemaConfig = {
    query: GraphQLObjectType;
    mutation?: ?GraphQLObjectType;
}
```
* Object types expect a config, including a name, description, fields property. 
```javascript
class GraphQLObjectType {
    constructor(config: GraphQLObjectTypeConfig)
}

type GraphQLObjectTypeConfig = {
    name: string
    description?: ?string
    fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap
    interfaces?: ...
    
}

const EmployeeType = newGraphQLObjectType({
    name: 'Employee',
    fields: {
        name: { type: GraphQLString },
        departmentName: { type: GraphQLString },
    }
})

```


## Type System

* GraphQl strongly typed language
* GraphQLFieldConfig - output type which can be a custom type, i.e EmployeeType or a GraphQLScalarType - GraphQL + 
    - Int
    - Float
    - String
    - Boolean
    - ID
* any type can be wrapped in a 
    - GraphQLList - an array of data
    - GraphQLNonNull - enforces the value it wraps is never null. 

### Enums

* a list of possible values and can only be one value- I.e integers or strings that represent a role for a switch case
```javascript
const ContractType = new GraphQLEnumType({
    name: 'Contract',
    values: {
        FULLTIME:  { value: 1 },
        PARTTIME:  { value: 2 },
        SHIFTWORK: { value: 3 }
    }
})
```

### Resolve Function
* can accept four optional arguments 
    - source: represents the field we're configuring. Represents the object we respond with. - i.e can extract data from a data object. 
    - args: arguments
    - context: global context object that can be passed to all resolve functions i.e database connection or authenticated user session, cache object.
    - info: collection of info about current execution state. - can be used to dynamicaly modify the resolved value of a field. 


* **interfaces** and **unions** are abstract types that can be used to group other types
* interfaces are a guarantee that the object will support all fields that are defined by the interface. can be used directly in fields. 

```javascript
    const PersonType = new GraphQLInterfaceType({
        name: 'Person',
        fields: {
            name: {type: }
        }
    })
    // referenced in other object types like this
    fields: {
        interfaces: [PersonType]
    }
```


## The Query Language

```javascript
// query name optional
query QueryName {
    //first requestItem is a property on the root query object (entry point)
    requestedItem(requestedItemId: Id) {
        // requested data structure - nestable - one selection sets can contain other sets
        requestedDataType {
            data,
            data,
            nestedDataType {
                data,
                data
            }
        }
    }
}
```

### Fields

* Think of them as functions, they return something as a response, they take arguments


### Variables

* Make queries generic/reusable - functional 
* the query must be passed this information to set scope - exclamation mark after Int indicates that it must be passed an integer and will not except null

```javascript
query ArticleComments($articleId: Int!, $showInformation: Boolean!) {
    article(articleId: $articleId)
}
```
* with an HTTP interface a request is sent by using:
```javascript
"/graphql?query={...}&variables={...}"
```

### Directives

* Customize structure of response based on a variable- i.e boolean. 
* Directives can be used in multiple locations in a GraphQL document, including an operation, a fragment, or a field. 
* @include - excepts boolean and will include a field or fragment when true & @skip to skip a field
```javascript
field @include(if: $Boolean)
field @skip(if: $BooleanValue)
```

### Fragments
* avoid repetition with fragments, to represent a type of data and its associated fields. an example fragment to represent the planets in a solar system
```javascript

query SolarSystems {
    solarSystem: solarSystem(id: 42)
    ...Planets
}

fragment Planets on SolarSystem {
    planets {
        orbitalPeriod
        knownSatellites 
        surfaceGravity
    }
} 
```
* can use variables in fragments- if used the variable has to be defined by the operation that uses the fragment
* inline fragments - if a type covers multiple objects


### Unions 

* Unions can group two objects that don't have any fields in common with a certain logic. 
* Union to represent a resume section that can be either education or experience type. 
```javascript
    const ResumeSectionType = new GraphQLUnionType({
     name: 'ResumeSection',
     types: [ExperienceType, EducationType],
     resolveType(value) {
       if (value instanceof Experience) {
         return ExperienceType;
       }
       if (value instanceof Education) {
         return EducationType;
       }
} })
```
* Inline fragments can be used to ask about fields of the types that the union represents
```javascript
 query ResumeInformation {
     ResumeSection {
       ... on Education {
         schoolName,
         fieldOfStudy
       }
       ... on Experience {
         companyName,
title }
} }
```



### Mutations

* a good runtime implementation executes multiple mutations in a single request
* can read and write at same time 

### Caching Schema in JSON file

* /index.js above port listen 

```javascript
const fs = require('fs')
const path = require('path')
const { introspectionQuery } = require('graphql/utilities')
const { graphql } = require('graphql')

graphql(mySchema, introspectionQuery)
    .then(result => {
        fs.writeFileSync(
            path.join(__dirname, 'cache/schema.json'),
            JSON.stringify(result, null, 2)
        )
        console.log('Generated cached schema.json file;')
    })
    .catch(console.error)
```

# Notes on Learning GraphQL by Samer Buna, 2016, Packt Publishing

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
```

## Type System

* GraphQl strongly typed language
* GraphQLFieldConfig - output type which can be a custom type, i.e EmployeeType or a GraphQLScalarType - GraphQL + 
- Int
- Float
- String
- Boolean
- ID


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

### Aliases
* rename simply by giving a value to the key
```javascript
{
    responses: comments
}
```
* can be refered to by aliases in further queries

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

### Mutations

* a good runtime implementation executes multiple mutations in a single request
* can read and write at same time 
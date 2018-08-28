# Notes on Learning GraphQL by Samer Buna, 2016, Packt Publishing

```javascript
class GraphQLSchema {
    constructor(config: GraphQLSchemaConfig)
}

type GraphQLSchemaConfig = {
    query: GraphQLObjectType;
    mutation?: ?GraphQLObjectType;
}

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

### Fragments
*
import Relay from 'react-relay/classic'


class ThumbsUpMutation extends Relay.Mutation {

    // requirements for mutation - in this case the id property of our Quote object
    static fragments = {
        quote: () => Relay.QL `
            fragment on Quote {
                id
            }
        `
    }

    // specify name of GraphQL mutation field to invoke
    getMutation() {
        return Relay.QL `
        mutation {
            thumbsUp
        }
        `
    }
    // define structure of input object
    getVariables() {
        return {
            quoteId: this.props.quote.id
        }
    }
    // GraphQL fragment representing everything that can change in the data model as a result of the mutation
    getFatQuery() {
        return Relay.QL `
            fragment on ThumbsUpMutationPayload {
                quote {
                    likesCount
                }
            }
        `
    }
    // instruct relay how to structure the output of the mutation
    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    quote: this.props.quote.id
                }
            }
        ]
    }
}

export default ThumbsUpMutation
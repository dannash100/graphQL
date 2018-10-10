import React from "react"
import ReactDOM from "react-dom"
import Relay from "react-relay/classic"

import { debounce } from 'lodash'

import Quote from "./components/Quote"
import SearchForm from "./components/SearchForm"

class AppRoute extends Relay.Route {
  static routeName = "App"
  static queries = {
    library: (Component) => Relay.QL `
      query QuotesLibrary {
        quotesLibrary {
          ${Component.getFragment('library')}
        }
      }
    `
  }
}

class QuotesLibrary extends React.Component {
  render() {
    return (
      <div className="quotes-list">
        {this.props.library.quotesConnection.edges.map(edge => 
          <Quote key={edge.node.id} quote={edge.node} />
        )}
      </div>
    );
  }
}

QuotesLibrary = Relay.createContainer(QuotesLibrary, {
  fragments: {
    library: () => Relay.QL `
    fragment on QuotesLibrary {
      quotesConnection(first: 2) {
        edges {
          node { 
            id
            ${Quote.getFragment('quote')}
          }
        } 
      }
    } 
`
  }
});

ReactDOM.render(
  <Relay.RootContainer Component={QuotesLibrary} route={new AppRoute()} />,
  document.getElementById("react")
);


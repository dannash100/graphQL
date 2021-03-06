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

  constructor(props) {
    super(props)
    this.search = debounce(this.search.bind(this), 300)
  }

  search(searchTerm) {
    this.props.relay.setVariables({searchTerm})
  }

  render() {
    return (
      <div className="quotes-library">
        <SearchForm searchAction={this.search} />
        <div className="quotes-list">
          {this.props.library.quotesConnection.edges.map(edge => 
            <Quote key={edge.node.id} quote={edge.node} />
            )}
        </div>
      </div>
    );
  }
}

QuotesLibrary = Relay.createContainer(QuotesLibrary, {
  initialVariables: {
    searchTerm: ''
  },
  fragments: {
    library: () => Relay.QL `
      fragment on QuotesLibrary {
        quotesConnection(first: 100, searchTerm: $searchTerm) {
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


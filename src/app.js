import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay/classic";
import Quote from "./components/Quote";

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
        {this.props.library.allQuotes.map(quote => 
          <Quote key={quote.id} quote={quote} />
        )}
      </div>
    );
  }
}

QuotesLibrary.defaultProps = {
  greeting: "Hello"
};

QuotesLibrary = Relay.createContainer(QuotesLibrary, {
  fragments: {
    library: () => Relay.QL `
      fragment AllQuotes on QuotesLibrary {
        allQuotes {
          id
          ${Quote.getFragment('quote')}
        }
      }
    `
  }
});

ReactDOM.render(
  <Relay.RootContainer Component={QuotesLibrary} route={new AppRoute()} />,
  document.getElementById("react")
);


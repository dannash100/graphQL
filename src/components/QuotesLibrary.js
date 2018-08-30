import React from "react";
import Quote from "./quote";

class QuotesLibrary extends React.Component {
  
  state = { allQuotes: [] }

  componentDidMount() {
    fetch(`/graphql?query={
      allQuotes {
        id,
        text,
        author
      }
    }`)
    .then(response => response.json())
    .then(json => this.setState(json.data))
  }

  render() {
    return (
      <div className="quotes-list">
        {this.state.allQuotes.map(quote => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
    );
  }
}

export default QuotesLibrary

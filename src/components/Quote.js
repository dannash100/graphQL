import React from "react";
import Relay from "react-relay/classic";


class Quote extends React.Component {
  displayLikes() {
    if (!this.props.relay.variables.showLikes) {
      return null
    }
    return (
      <div>
        {this.props.quite.likesCount} &nbsp;
        <span className="glyphicon glyphicon-thumps-up">
        </span>
      </div>
    )
  }
  
  showLikes = () => {
    this.props.relay.setVariables({showLikes: true})
  }

  render() {
    return (
      <blockquote onClick={this.showLikes}>
        <p>{this.props.quote.text}</p>
        <footer>{this.props.quote.author}</footer>
        {this.displayLikes()}
      </blockquote>
    );
  }
}

Quote = Relay.createContainer(Quote, {
  initialVariables: {
    showLikes: false
  },
  fragments: {
    quote: () => Relay.QL `
      fragment OneQuote on Quote {
        text
        author
        likesCount @include(if: $showLikes)
      }
    `
  }
})

export default Quote;

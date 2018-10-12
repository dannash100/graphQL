import React from "react";
import Relay from "react-relay/classic";
import ThumbsUpMutation from '../mutations/ThumbsUpMutation'


class Quote extends React.Component {

  state = {
    liked: false
  }

  displayLikes() {
    let liked = this.state.liked
    if (!this.props.relay.variables.showLikes) {
      return null
    }
    return (
      <div>
        {this.props.quote.likesCount} &nbsp;
        <span className="glyphicon glyphicon-thumbs-up"
          style={liked? {color:'green'} : {color: 'black'}}
          onClick={this.thumbsUpClick}>
        </span>
      </div>
    )
  }

  thumbsUpClick = () => {
    let liked = this.state.liked
    if(!liked) {
      Relay.Store.commitUpdate(
        new ThumbsUpMutation({
          quote: this.props.quote
        })
      )
    this.setState({liked: true})    
    }
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
        ${ThumbsUpMutation.getFragment('quote')}
        text
        author
        likesCount @include(if: $showLikes)
      }
    `
  }
})

export default Quote;

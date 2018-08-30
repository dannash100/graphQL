import React from "react";
import ReactDOM from "react-dom";
import QuotesLibrary from "./components/QuotesLibrary"

class App extends React.Component {
  render() {
    return <QuotesLibrary />
  }
}

App.defaultProps = {
  greeting: "Hello"
}

ReactDOM.render(<App />, document.getElementById("react"));

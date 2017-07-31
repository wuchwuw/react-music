import React from 'react'
import ReactDOM from 'react-dom'

class HelloReact extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

ReactDOM.render(<HelloReact name="React"/>, document.getElementById('app'))

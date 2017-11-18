
import React from 'react'
import './main.less'

class AppComponent extends React.Component {
  render () {
    return (
      <div className="app">
        hello world
      </div>
    );
  }
}

AppComponent.defaultProps = { }
export default AppComponent
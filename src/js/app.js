import "babel-polyfill"

import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRedirect, hashHistory } from "react-router"

import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Articles from './components/Articles.jsx'
import Projects from './components/Projects.jsx'

class App extends Component {
  render() {
    return(
      <div>
        <Header />
        { this.props.children }
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>
      <IndexRedirect to='/projects' />
      <Route path='/projects' component={ Projects } />
      <Route path='/articles' component={ Articles } />
      <Route path='/About' component={ About } />
    </Route>
  </Router>
  ,
  document.getElementById('root')
)
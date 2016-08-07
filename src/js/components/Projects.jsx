import React, { Component } from 'react'

export default class Projects extends Component {
  render() {
    return (
      <div id="projects">
        <div className="row center">
          <div id="p1" className="project column center">
            <p className="row center">
              <a href="https://jstruthers.github.io/blocPong/">blocPong</a>
            </p>
          </div>
          <div id="p2" className="project column center">
            <p className="row center">
              <a href="https://jsbloc-chat.herokuapp.com/">blocChat</a>
            </p>
          </div>
          <div id="p3" className="project column center">
            <p className="row center">
              <a href="https://jstruthers.github.io/blocJamsReact/">blocJams</a>
            </p>
          </div>
          <div id="p4" className="project column center">
            <p className="row center">
              <a href="https://jstruthers.github.io/blocTime/">blocTime</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          Jackson Struthers
        </h1>

        <nav>
          <span>Blog</span>
          <span className="hyphen">-</span>
          <span>Projects</span>
          <span className="hyphen">-</span>
          <span>About <span>&</span> Contact</span>
        </nav>
      </header>
    )
  }
}

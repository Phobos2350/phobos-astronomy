import React from 'react'
import base from './base.css'
import Navigation from './navigation'
import Footer from './footer'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <React.Fragment>
        <Navigation />
          {children}
        <Footer />
      </React.Fragment>
    )
  }
}

export default Template

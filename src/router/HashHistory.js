import React from 'react'
import PropTypes from 'prop-types'

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hash:this.getHash ()
    }
  }

  static childContextTypes = {
    hash: PropTypes.string
  }

  getHash () {
    let url = window.location.hash.replace('#','')
    return url
  }

  getChildContext () {
    return {
      hash:this.state.hash
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        hash:this.getHash()
      })
    }
  }

  render () {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

class Route extends React.Component {
  static contextTypes = {
    hash: PropTypes.string
  }

  render () {
    const {
      path, component
    } = this.props
    let instance = null
    const {hash} = this.context
    if (path === hash) {
      // component是一个类，如果要使用它，需要实例化它
      instance = React.createElement(component, null, null)
    }
    return (
      <>
        {instance}
      </>
    )
  }
}

class AA extends React.Component {
  render () {
    return (
      <div>
        aa
      </div>
    )
  }
}

class BB extends React.Component {
  render () {
    return (
      <div>
        bb
      </div>
    )
  }
}

window.onhashchange = (e) => {
  console.log(e)
}

// const AA = () => <div>aa</div>
// const BB = () => <div>bb</div>

function App () {
  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <div>header</div>
          <Route path='/aa' component={AA} />
          <Route path='/bb' component={BB} />
        </header>
      </Router>
    </div>
  )
}

export default App

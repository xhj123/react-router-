import React from 'react'
import PropTypes from 'prop-types'

class MyRoute extends React.Component {
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

MyRoute.contextTypes = {
  hash: PropTypes.string
}

class MyRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hash:this.getHash()
    }
    this.history = window.history
  }

  getHash () {
    let url = window.location.pathname
    // 如果地址为/aa?a=1，它会自动帮我们把?a=1过滤掉
    return url
  }

  getChildContext () {
    return {
      hash:this.state.hash
    }
  }

  componentDidMount() {
    this.history.route = (name) => {
      this.setState({
        hash:`${name}`
      })
      // 网页不刷新而跳转路由
      window.history.pushState(null,null,name)
    }
    // 测试跳转
    setTimeout(() => {
      this.history.route('/aa')
    },3000)
  }

  render () {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

MyRouter.childContextTypes = {
  hash: PropTypes.string
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

class App extends React.Component {
  render() {
    return (
        <div className='App'>
          <MyRouter>
            <header className='App-header'>
              <div>header</div>
              <MyRoute path='/aa' component={AA} />
              <MyRoute path='/bb' component={BB} />
            </header>
          </MyRouter>
        </div>
    )
  }
}

export default App

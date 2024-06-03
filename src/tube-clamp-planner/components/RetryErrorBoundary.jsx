import React from 'react'
import { Alert, Spin, notification, Collapse } from 'antd'

class RetryErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: undefined, retry: false }
  }

  componentDidCatch (error, info) {
    console.error(error)
    this.setState({ error, retry: true })
    notification.error({
      message: 'Oops...',
      description: 'We\'ve encountered a problem and had to rerender.',
      maxCount: 1,
      duration: 10000,
    })
  }

  render () {
    if (this.state.error) {
      if (this.props.count > 3) {
        return (
          <div style={{ margin: 20 }}>
            <Alert message={this.props.message + ': See logs for details'} type="error"/>
          </div>
        )
      }
      if (!this.state.retry) {
        return <Spin/>
      }
      return (
        <RetryErrorBoundary message={this.props.message} count={(this.props.count || 0) + 1}>
          {this.props.children}
        </RetryErrorBoundary>
      )
    }
    return this.props.children
  }
}

export default RetryErrorBoundary

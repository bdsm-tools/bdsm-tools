import React from 'react';
import { Alert, Spin, notification } from 'antd';

class RetryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, retry: false };
  }

  componentDidCatch(error, info) {
    console.error(error);
    this.setState({ hasError: true, retry: true });
    notification.error({
      message: 'Oops...',
      description: 'We\'ve encountered a problem and had to rerender.',
      maxCount: 1,
      duration: 10000,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.count > 3) {
        return (
          <Alert message={this.props.message} type="error" />
        );
      }
      if (!this.state.retry ) {
        return <Spin />;
      }
      return (
        <RetryErrorBoundary count={(this.props.count || 0) + 1}>
          {this.props.children}
        </RetryErrorBoundary>
      )
    }
    return this.props.children;
  }
}

export default RetryErrorBoundary;

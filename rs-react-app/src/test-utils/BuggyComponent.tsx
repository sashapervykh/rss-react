import { Component } from 'react';

interface Props {
  isError: true;
}

export class BuggyComponent extends Component<Props> {
  render() {
    if (this.props.isError)
      throw new Error('Throwing error to test ErrorBoundary');
    return <h1>No error was thrown</h1>;
  }
}

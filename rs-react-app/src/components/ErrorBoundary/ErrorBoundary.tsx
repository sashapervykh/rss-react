import { Component, type ReactNode } from 'react';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: string | undefined;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  render() {
    if (this.state.hasError)
      return (
        <ErrorFallback
          message={this.state.error}
          reset={this.resetErrorState}
        />
      );
    return this.props.children;
  }

  resetErrorState = () => {
    this.setState({ hasError: false, error: undefined });
  };
}

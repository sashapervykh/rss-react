import { Component } from 'react';
import { Button } from '../Button/Button';

interface State {
  error: boolean;
}

export class BreakingButton extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = { error: false };
  }
  componentDidUpdate(): void {
    if (this.state.error) {
      throw new Error('Congratulations! You crashed the app!');
    }
  }

  render() {
    return (
      <Button
        text="BREAK!"
        onClick={() => {
          this.setState({ error: true });
        }}
      />
    );
  }
}

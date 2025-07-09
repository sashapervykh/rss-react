import { Component, type ReactNode } from 'react';

interface Props {
  text: string;
  type?: 'submit';
}

export class Button extends Component<Props> {
  render(): ReactNode {
    return (
      <button type={this.props.type ? this.props.type : 'button'}>
        {this.props.text}
      </button>
    );
  }
}

import { Component, type ReactNode } from 'react';

interface Props {
  description: string;
  title: string;
}

export class CardText extends Component<Props> {
  render(): ReactNode {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

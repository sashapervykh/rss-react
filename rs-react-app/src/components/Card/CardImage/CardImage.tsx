import { Component, type ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
}

export class CardImage extends Component<Props> {
  render(): ReactNode {
    return <img src={this.props.src} alt={this.props.alt} />;
  }
}

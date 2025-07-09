import { Component, type ReactNode } from 'react';
import { CardText } from './CardText/CardText';
import { CardImage } from './CardImage/CardImage';

interface Props {
  img: string;
  title: string;
  description: string;
}

export class Card extends Component<Props> {
  render(): ReactNode {
    return (
      <div>
        <CardImage src={this.props.img} alt={this.props.title} />
        <CardText
          title={this.props.title}
          description={this.props.description}
        />
      </div>
    );
  }
}

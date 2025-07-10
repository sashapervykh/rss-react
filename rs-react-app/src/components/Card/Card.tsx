import { Component, type ReactNode } from 'react';
import { CardText } from './CardText/CardText';
import { CardMedia } from './CardMedia/CardMedia';
import style from './style.module.css';

interface Props {
  source?: string;
  title: string;
  description: string;
}

export class Card extends Component<Props> {
  render(): ReactNode {
    return (
      <div className={style['card-wrapper']}>
        <CardMedia src={this.props.source} alt={this.props.title} />
        <CardText
          title={this.props.title}
          description={this.props.description}
        />
      </div>
    );
  }
}

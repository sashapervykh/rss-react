import { Component, type ReactNode } from 'react';
import style from './style.module.css';

interface Props {
  description: string;
  title: string;
}

export class CardText extends Component<Props> {
  render(): ReactNode {
    return (
      <div className={style['text-wrapper']}>
        <h2 className={style['card-title']}>{this.props.title}</h2>
        <p className={style['main-text']}>{this.props.description}</p>
      </div>
    );
  }
}

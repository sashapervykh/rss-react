import { Component, type ReactNode } from 'react';
import style from './style.module.css';

interface Props {
  src: string;
  alt: string;
}

export class CardImage extends Component<Props> {
  render(): ReactNode {
    return (
      <div className={style['image-wrapper']}>
        <img
          className={style.image}
          src={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }
}

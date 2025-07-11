import { Component, type ReactNode } from 'react';
import style from './style.module.css';
import NO_IMAGE from '../../../../public/no_image_available.png';

interface Props {
  src?: string;
  alt: string;
  media_type: string;
}

export class CardMedia extends Component<Props> {
  render(): ReactNode {
    return (
      <div className={style['image-wrapper']}>
        <img
          className={style.image}
          src={
            this.props.media_type === 'image' ||
            this.props.media_type === 'video'
              ? this.props.src
              : NO_IMAGE
          }
          alt={this.props.alt}
        />
      </div>
    );
  }
}

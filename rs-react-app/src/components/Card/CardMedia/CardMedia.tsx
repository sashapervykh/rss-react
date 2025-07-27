import style from './style.module.css';
import NO_IMAGE from '/no_image_available.png';

interface Props {
  src?: string;
  alt: string;
  media_type: string;
}

export function CardMedia(props: Props) {
  return (
    <div className={style['image-wrapper']}>
      <img
        className={style.image}
        src={
          props.media_type === 'image' || props.media_type === 'video'
            ? props.src
            : NO_IMAGE
        }
        alt={props.alt}
      />
    </div>
  );
}

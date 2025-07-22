import { CardText } from './CardText/CardText';
import { CardMedia } from './CardMedia/CardMedia';
import style from './style.module.css';

interface Props {
  source?: string;
  title: string;
  description: string;
  media_type: string;
}

export function Card(props: Props) {
  return (
    <div className={style['card-wrapper']} data-testid="card">
      <CardMedia
        media_type={props.media_type}
        src={props.source}
        alt={props.title}
      />
      <CardText title={props.title} description={props.description} />
    </div>
  );
}

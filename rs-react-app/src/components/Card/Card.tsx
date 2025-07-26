import { CardText } from './CardText/CardText';
import { CardMedia } from './CardMedia/CardMedia';
import style from './style.module.css';
import { useSearchParams } from 'react-router';

interface Props {
  source?: string;
  title: string;
  description: string;
  media_type: string;
  page: number;
  id: number;
}

export function Card(props: Props) {
  const [_, setSearchParams] = useSearchParams();
  const handleClick = () => {
    setSearchParams({
      page: props.page.toString(),
      details: props.id.toString(),
    });
  };

  return (
    <div
      className={style['card-wrapper']}
      data-testid="card"
      onClick={handleClick}
    >
      <CardMedia
        media_type={props.media_type}
        src={props.source}
        alt={props.title}
      />
      <CardText title={props.title} description={props.description} />
    </div>
  );
}

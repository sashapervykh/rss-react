import { CardText } from './CardText/CardText';
import { CardMedia } from './CardMedia/CardMedia';
import style from './style.module.css';
import { useSearchParams } from 'react-router';
import { useCustomDispatch } from '../../hooks/reduxHooks';
import { cardSlice } from '../../store/reducers/CardSlice';

interface Props {
  source?: string;
  title: string;
  description: string;
  media_type: string;
  nasa_id: string;
}

export function Card(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addCard, deleteCard } = cardSlice.actions;
  const dispatch = useCustomDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(event.target instanceof HTMLInputElement))
      setSearchParams({
        page: searchParams.get('page') ?? '1',
        details: props.nasa_id.toString(),
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addCard(props));
    } else {
      dispatch(deleteCard(props));
    }
  };

  return (
    <div
      className={style['card-wrapper']}
      data-testid="card"
      onClick={(event) => handleClick(event)}
    >
      <input
        type="checkbox"
        className={style.checkbox}
        onChange={handleChange}
      />
      <CardMedia
        media_type={props.media_type}
        src={props.source}
        alt={props.title}
      />
      <CardText title={props.title} description={props.description} />
    </div>
  );
}

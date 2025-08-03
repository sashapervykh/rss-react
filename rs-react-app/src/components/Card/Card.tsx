import { CardText } from './CardText/CardText';
import { CardMedia } from './CardMedia/CardMedia';
import style from './style.module.css';
import { useSearchParams } from 'react-router';
import { useCustomDispatch, useCustomSelector } from '../../hooks/reduxHooks';
import { cardSlice } from '../../store/reducers/CardSlice';
import { useEffect, useState } from 'react';
import shared from '../../styles/shared.module.css';
import { useTheme } from '../../hooks/useTheme/useTheme';

interface Props {
  source?: string;
  title: string;
  description: string;
  media_type: string;
  nasa_id: string;
}

export function Card(props: Props) {
  const { theme } = useTheme();
  const { amount, cards } = useCustomSelector((state) => state.CardReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addCard, deleteCard } = cardSlice.actions;
  const dispatch = useCustomDispatch();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (amount === 0) {
      setIsChecked(false);
      return;
    }
    if (cards.find((card) => card.nasa_id === props.nasa_id)) {
      setIsChecked(true);
    }
  }, [amount, cards, props.nasa_id]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(event.target instanceof HTMLInputElement))
      setSearchParams({
        page: searchParams.get('page') ?? '1',
        details: props.nasa_id.toString(),
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(addCard(props));
    } else {
      dispatch(deleteCard(props));
    }
  };

  return (
    <div
      className={`${style['card-wrapper']} ${shared[`element-${theme}`]}`}
      data-testid="card"
      onClick={(event) => handleClick(event)}
    >
      <input
        checked={isChecked}
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

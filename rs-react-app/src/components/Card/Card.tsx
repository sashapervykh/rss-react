import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { SearchResultType } from '../../api/utils/types';

import { useCustomDispatch, useCustomSelector } from '../../hooks/reduxHooks';
import { useTheme } from '../../hooks/useTheme/useTheme';
import { cardSlice } from '../../store/reducers/CardSlice';
import shared from '../../styles/shared.module.css';

import { CardMedia } from './CardMedia/CardMedia';
import { CardText } from './CardText/CardText';
import style from './style.module.css';

export function Card(props: SearchResultType) {
  const { theme } = useTheme();
  const { amount, cards } = useCustomSelector((state) => state.CardReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useCustomDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { addCard, deleteCard } = cardSlice.actions;
  const { title, description, source, media_type, nasa_id } = props;

  useEffect(() => {
    if (amount === 0) {
      setIsChecked(false);
      return;
    }
    if (cards.find((card) => card.nasa_id === nasa_id)) {
      setIsChecked(true);
    }
  }, [amount, cards, nasa_id]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(event.target instanceof HTMLInputElement))
      setSearchParams({
        page: searchParams.get('page') ?? '1',
        details: nasa_id.toString(),
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
      <CardMedia media_type={media_type} src={source} alt={title} />
      <CardText title={title} description={description} />
    </div>
  );
}

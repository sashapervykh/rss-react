import { useCustomDispatch, useCustomSelector } from '../../hooks/reduxHooks';
import { cardSlice } from '../../store/reducers/CardSlice';
import { Button } from '../Button/Button';
import style from './style.module.css';

export function Flyout() {
  const { amount } = useCustomSelector((state) => state.CardReducer);
  const { clear } = cardSlice.actions;
  const dispatch = useCustomDispatch();

  return (
    amount && (
      <div className={style.flyout}>
        <div>Selected items: {amount}</div>
        <Button text="Unselect all" onClick={() => dispatch(clear())} />
      </div>
    )
  );
}

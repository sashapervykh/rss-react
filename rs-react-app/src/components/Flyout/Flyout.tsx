import { useCustomSelector } from '../../hooks/reduxHooks';
import style from './style.module.css';

export function Flyout() {
  const { amount } = useCustomSelector((state) => state.CardReducer);

  return (
    amount && <div className={style.flyout}>`Selected items: {amount}`</div>
  );
}

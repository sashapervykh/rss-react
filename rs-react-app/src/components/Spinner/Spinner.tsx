import style from './style.module.css';

export function Spinner() {
  return (
    <div className={style.wrapper} data-testid="spinner">
      <div className={style.sun}></div>
      <div className={style['second-line']}>
        <div className={style['second-planet']}></div>
      </div>
      <div className={style['first-line']}>
        <div className={style['first-planet']}></div>
      </div>
    </div>
  );
}

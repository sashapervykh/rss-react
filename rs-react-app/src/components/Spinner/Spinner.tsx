import style from './style.module.css';

export function Spinner() {
  return (
    <div className={style.wrapper}>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
    </div>
  );
}

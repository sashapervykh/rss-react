import type { Person } from '../../models/types';
import style from './style.module.css';

interface Props {
  elem: Person;
}

export function Card(props: Props) {
  const { elem } = props;
  return (
    <div className={style['card-wrapper']}>
      <div className={style['image-wrapper']}>
        <img className={style.image} src={`${elem.image}`} />
      </div>
      <div className={style.text}>
        <p className={style['text-line']}>
          <b>Name:</b> {elem.name}
        </p>
        <p className={style['text-line']}>
          <b>Age:</b> {elem.age}
        </p>
        <p className={style['text-line']}>
          <b>Email:</b> {elem.email}
        </p>
        <p className={style['text-line']}>
          <b>Gender:</b> {elem.gender}
        </p>
        <p className={style['text-line']}>
          <b>Password:</b> {elem.password}
        </p>
      </div>
    </div>
  );
}

import style from './style.module.css';

interface Props {
  description: string;
  title: string;
}

export function CardText(props: Props) {
  return (
    <div className={style['text-wrapper']}>
      <h2 className={style['card-title']}>{props.title}</h2>
      <p className={style['main-text']}>{props.description}</p>
    </div>
  );
}

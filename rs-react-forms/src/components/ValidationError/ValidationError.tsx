import style from './style.module.css';

export function ValidationError({ message }: { message: string | undefined }) {
  return <p className={style.error}>{message}</p>;
}

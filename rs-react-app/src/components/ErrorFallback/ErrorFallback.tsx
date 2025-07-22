import { Button } from '../Button/Button';
import style from './style.module.css';

interface Props {
  message: undefined | string;
  reset: () => void;
}

export function ErrorFallback(props: Props) {
  return (
    <div className={style['fallback-wrapper']}>
      <p className={style['fallback-element']}>Something went wrong...</p>
      <p className={style['fallback-element']}>
        Press &apos;Reset&apos; to try again{' '}
      </p>
      {props.message && (
        <details className={style['fallback-element']}>{props.message}</details>
      )}
      <Button text="Reset" onClick={props.reset} />
    </div>
  );
}

import style from './style.module.css';

interface Props {
  text: string;
  type?: 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button(props: Props) {
  return (
    <button
      className={style.button}
      onClick={props.onClick}
      type={props.type ? props.type : 'button'}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

import style from './style.module.css';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Button(props: ButtonProps) {
  const { text, disabled, onClick } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={style.button}
    >
      {text}
    </button>
  );
}

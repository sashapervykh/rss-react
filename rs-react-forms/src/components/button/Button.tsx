import style from './style.module.css';

interface ButtonProps {
  text: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Button(props: ButtonProps) {
  const { text, onClick } = props;
  return (
    <button
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={style.button}
    >
      {text}
    </button>
  );
}

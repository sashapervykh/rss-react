import style from './style.module.css';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Button(props: ButtonProps) {
  const { text, disabled, tabIndex, onClick } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={style.button}
      tabIndex={tabIndex}
    >
      {text}
    </button>
  );
}

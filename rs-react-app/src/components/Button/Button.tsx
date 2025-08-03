import { useTheme } from '../../hooks/useTheme/useTheme';
import style from './style.module.css';

interface Props {
  text: string;
  type?: 'submit';
  onClick?: () => void;
  disabled?: boolean;
  style?: string;
}

export function Button(props: Props) {
  const { theme } = useTheme();

  return (
    <button
      className={`${style.button} ${style[`button-${theme}`]} ${props.style ?? ''}`}
      onClick={props.onClick}
      type={props.type ? props.type : 'button'}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

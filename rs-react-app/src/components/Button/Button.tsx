import { Component, type ReactNode } from 'react';
import style from './style.module.css';

interface Props {
  text: string;
  type?: 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export class Button extends Component<Props> {
  render(): ReactNode {
    return (
      <button
        className={style.button}
        onClick={this.props.onClick}
        type={this.props.type ? this.props.type : 'button'}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    );
  }
}

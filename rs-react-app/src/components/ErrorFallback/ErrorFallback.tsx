import { Component } from 'react';
import { Button } from '../Button/Button';
import style from './style.module.css';

interface Props {
  message: undefined | string;
  reset: () => void;
}

export class ErrorFallback extends Component<Props> {
  render() {
    return (
      <div className={style['fallback-wrapper']}>
        <p className={style['fallback-element']}>Something went wrong...</p>
        <p className={style['fallback-element']}>
          Press &apos;Reset&apos; to try again{' '}
        </p>
        {this.props.message && (
          <details className={style['fallback-element']}>
            {this.props.message}
          </details>
        )}
        <Button text="Reset" onClick={this.props.reset} />
      </div>
    );
  }
}

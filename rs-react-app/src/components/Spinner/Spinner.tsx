import { Component } from 'react';
import style from './style.module.css';

export class Spinner extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.sun}></div>
        <div className={style['second-line']}>
          <div className={style['second-planet']}></div>
        </div>
        <div className={style['first-line']}>
          <div className={style['first-planet']}></div>
        </div>
      </div>
    );
  }
}

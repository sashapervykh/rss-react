import { createPortal } from 'react-dom';
import style from './style.module.css';
import { RHForm } from '../RHForm/RHForm';

export function Modal() {
  return createPortal(
    <div className={style['modal-wrapper']}>
      <RHForm />
    </div>,
    document.body
  );
}

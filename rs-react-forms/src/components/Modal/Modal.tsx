import { createPortal } from 'react-dom';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';
import style from './style.module.css';

export function Modal() {
  return createPortal(
    <div className={style['modal-wrapper']}>
      <UncontrolledForm />
    </div>,
    document.body
  );
}

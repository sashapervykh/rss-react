import { createPortal } from 'react-dom';
import style from './style.module.css';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';

export function Modal() {
  return createPortal(
    <div className={style['modal-wrapper']}>
      <UncontrolledForm />
    </div>,
    document.body
  );
}

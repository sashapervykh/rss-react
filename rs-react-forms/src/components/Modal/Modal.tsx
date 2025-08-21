import { createPortal } from 'react-dom';
import style from './style.module.css';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';

export function Modal() {
  return createPortal(
    <dialog className={style['modal-wrapper']}>
      <UncontrolledForm />
    </dialog>,
    document.body
  );
}

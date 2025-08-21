import { createPortal } from 'react-dom';
import style from './style.module.css';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';
import { useModal } from '../../hooks/useModal/useModal';
import { RHForm } from '../RHForm/RHForm';

export function Modal() {
  const { modal } = useModal();

  if (!modal) return;

  return createPortal(
    <dialog className={style['modal-wrapper']}>
      {modal === 'uncontrolled' && <UncontrolledForm />}
      {modal === 'rhf' && <RHForm />}
    </dialog>,
    document.body
  );
}

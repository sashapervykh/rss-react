import { createPortal } from 'react-dom';
import style from './style.module.css';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';
import { useModal } from '../../hooks/useModal/useModal';
import { RHForm } from '../RHForm/RHForm';
import { useEffect } from 'react';

export function Modal() {
  const { modal, toggleModal } = useModal();

  useEffect(() => {
    function handleEscPress(event: KeyboardEvent) {
      if (event.key === 'Escape') toggleModal(null);
    }

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [toggleModal]);

  if (!modal) return;

  return createPortal(
    <dialog
      className={style['modal-wrapper']}
      onClick={(event) => {
        const clickedElement = event.target;
        if (clickedElement instanceof HTMLElement) {
          const form = clickedElement.closest('form');
          if (!form) toggleModal(null);
        }
      }}
    >
      {modal === 'uncontrolled' && <UncontrolledForm />}
      {modal === 'rhf' && <RHForm />}
    </dialog>,
    document.body
  );
}

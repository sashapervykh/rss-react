import { useModal } from '../../hooks/useModal/useModal';
import { Button } from '../button/Button';
import { Modal } from '../Modal/Modal';
import style from './style.module.css';

export function ButtonsWrapper() {
  const { toggleModal } = useModal();
  return (
    <div className={style['buttons-wrapper']}>
      <div>
        <Button
          onClick={() => {
            toggleModal('rhf');
          }}
          text={'RHF Form'}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            toggleModal('uncontrolled');
          }}
          text={'Uncontrolled Form'}
        />
      </div>
      <Modal />
    </div>
  );
}

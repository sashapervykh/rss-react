import { Button } from '../button/Button';
import { Modal } from '../Modal/Modal';
import style from './style.module.css';

export function ButtonsWrapper() {
  return (
    <div className={style['buttons-wrapper']}>
      <div>
        <Button
          onClick={() => {
            console.log('click');
          }}
          text={'RHF Form'}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            console.log('click');
          }}
          text={'Uncontrolled Form'}
        />
      </div>
      <Modal />
    </div>
  );
}

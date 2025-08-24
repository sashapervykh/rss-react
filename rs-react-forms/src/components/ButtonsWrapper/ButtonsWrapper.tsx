import { useAppSelector } from '../../hooks/reduxHooks';
import { useModal } from '../../hooks/useModal/useModal';
import { Button } from '../button/Button';
import { Card } from '../Card/Card';
import { Modal } from '../Modal/Modal';
import style from './style.module.css';

export function ButtonsWrapper() {
  const { newlyAdded, rhfData, uncontrolledData } = useAppSelector(
    (state) => state.personsReducer
  );
  const { modal, toggleModal } = useModal();
  return (
    <div className={style['buttons-wrapper']}>
      <div>
        <Button
          onClick={() => {
            toggleModal('rhf');
          }}
          text={'RHF Form'}
          tabIndex={modal ? -1 : 0}
        />

        {rhfData.map((elem, index) => {
          return (
            <Card
              key={'rhf' + elem.name + index.toString()}
              elem={elem}
              isNew={
                newlyAdded === 'rhf' && index === uncontrolledData.length - 1
                  ? true
                  : false
              }
            />
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => {
            toggleModal('uncontrolled');
          }}
          text={'Uncontrolled Form'}
          tabIndex={modal ? -1 : 0}
        />

        {uncontrolledData.map((elem, index) => {
          return (
            <Card
              key={'uncontrolled' + elem.name + index.toString()}
              elem={elem}
              isNew={
                newlyAdded === 'uncontrolled' &&
                index === uncontrolledData.length - 1
                  ? true
                  : false
              }
            />
          );
        })}
      </div>
      <Modal />
    </div>
  );
}

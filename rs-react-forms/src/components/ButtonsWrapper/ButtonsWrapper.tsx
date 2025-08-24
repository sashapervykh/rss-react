import { useAppSelector } from '../../hooks/reduxHooks';
import { useModal } from '../../hooks/useModal/useModal';
import { Button } from '../button/Button';
import { Modal } from '../Modal/Modal';
import style from './style.module.css';

export function ButtonsWrapper() {
  const { rhfData, uncontrolledData } = useAppSelector(
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
        <div>
          {rhfData.map((elem) => {
            return (
              <>
                <p>Name: {elem.name}</p>
                <p>Age: {elem.age}</p>
                <p>Email: {elem.email}</p>
                <p>Gender: {elem.gender}</p>
                <p>Password: {elem.password}</p>
                <img src={`${elem.image}`} />
              </>
            );
          })}
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            toggleModal('uncontrolled');
          }}
          text={'Uncontrolled Form'}
          tabIndex={modal ? -1 : 0}
        />
        <div>
          {uncontrolledData.map((elem, index) => (
            <>
              <p key={elem.name + index}>Name: {elem.name}</p>
              <p key={elem.age + index}>Age: {elem.age}</p>
              <p key={elem.email + index}>Email: {elem.email}</p>
              <p key={elem.gender + index}>Gender: {elem.gender}</p>
              <p key={elem.password + index}>Password: {elem.password}</p>
              <img src={`${elem.image}`} />
            </>
          ))}
        </div>
      </div>
      <Modal />
    </div>
  );
}

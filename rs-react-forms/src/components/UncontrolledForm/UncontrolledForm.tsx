import { Button } from '../button/Button';
import style from '../../shared/form.module.css';
import { useModal } from '../../hooks/useModal/useModal';

export function UncontrolledForm() {
  const { toggleModal } = useModal();

  return (
    <form className={style.form}>
      <h1>Uncontrolled Form</h1>
      <label htmlFor="name">
        <div>Please enter your name:</div>
        <input name="name" type="text" placeholder="Enter name" />
      </label>
      <label htmlFor="age">
        <div>Please enter your age:</div>
        <input name="age" type="text" placeholder="Enter age" />
      </label>
      <label htmlFor="email">
        <div>Please enter your email:</div>
        <input name="email" type="email" placeholder="Enter label" />
      </label>
      <label htmlFor="country">
        <div>Please enter your country:</div>
        <input name="country" type="text" placeholder="Enter country" />
      </label>
      <label htmlFor="password">
        <div>Please enter your password:</div>
        <input name="password" type="password" placeholder="Enter password" />
      </label>
      <label htmlFor="confirmation">
        <div>Please enter your confirmation:</div>
        <input
          name="confirmation"
          type="password"
          placeholder="Confirm password"
        />
      </label>
      <label htmlFor="gender">
        <div>Choose your gender:</div>
        <input name="gender" type="radio" /> Man
        <input name="gender" type="radio" /> Woman
      </label>
      <label htmlFor="agreement">
        <input name="agreement" type="checkbox" />I agree with Terms &
        Conditions
      </label>

      <div>
        <Button text="Cancel" onClick={() => toggleModal(null)} />
        <Button text="Save" />
      </div>
    </form>
  );
}

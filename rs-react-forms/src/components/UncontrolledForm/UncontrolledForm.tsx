import { Button } from '../button/Button';
import style from './style.module.css';

export function UncontrolledForm() {
  return (
    <form className={style.form}>
      <label htmlFor="name">Please enter your name:</label>
      <input name="name" type="text" placeholder="Enter name" />
      <label htmlFor="age">Please enter your age:</label>
      <input name="age" type="text" placeholder="Enter age" />
      <label htmlFor="email">Please enter your email:</label>
      <input name="email" type="email" placeholder="Enter label" />
      <label htmlFor="password">Please enter your password:</label>
      <input name="password" type="password" placeholder="Enter password" />
      <label htmlFor="confirmation">Please enter your confirmation:</label>
      <input
        name="confirmation"
        type="password"
        placeholder="Confirm password"
      />
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
        <Button text="Cancel" />
        <Button text="Save" />
      </div>
    </form>
  );
}

import { useForm } from 'react-hook-form';
import style from '../../shared/form.module.css';
import { Button } from '../button/Button';
import { useModal } from '../../hooks/useModal/useModal';

export function RHForm() {
  const { toggleModal } = useModal();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>React-Hook-Form</h1>
      <label htmlFor="name">
        <div>Please enter your name:</div>
        <input
          {...register('name')}
          name="name"
          type="text"
          placeholder="Enter name"
        />
      </label>
      <label htmlFor="age">
        <div>Please enter your age:</div>
        <input
          {...register('age')}
          name="age"
          type="text"
          placeholder="Enter age"
        />
      </label>
      <label htmlFor="email">
        <div>Please enter your email:</div>
        <input
          {...register('email')}
          name="email"
          type="email"
          placeholder="Enter label"
        />
      </label>
      <label htmlFor="country">
        <div>Please enter your country:</div>
        <input
          {...register('country')}
          name="country"
          type="text"
          placeholder="Enter country"
        />
      </label>
      <label htmlFor="password">
        <div>Please enter your password:</div>
        <input
          {...register('password ')}
          name="password"
          type="password"
          placeholder="Enter password"
        />
      </label>
      <label htmlFor="confirmation">
        <div>Please enter your confirmation:</div>
        <input
          {...register('confirmation')}
          name="confirmation"
          type="password"
          placeholder="Confirm password"
        />
      </label>
      <label htmlFor="gender">
        <div>Choose your gender:</div>
        <input
          {...register('gender')}
          name="gender"
          type="radio"
          value="man"
        />{' '}
        Man
        <input
          {...register('gender')}
          name="gender"
          type="radio"
          value="woman"
        />{' '}
        Woman
      </label>
      <label htmlFor="agreement">
        <input {...register('agreement')} name="agreement" type="checkbox" />I
        agree with Terms & Conditions
      </label>

      <div>
        <Button text="Cancel" onClick={() => toggleModal(null)} />
        <Button text="Save" />
      </div>
    </form>
  );
}

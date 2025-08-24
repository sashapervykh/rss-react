import { useForm } from 'react-hook-form';
import style from '../../shared/form.module.css';
import { Button } from '../button/Button';
import { useModal } from '../../hooks/useModal/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../../models/schema';
import type z from 'zod';
import { ValidationError } from '../ValidationError/ValidationError';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { personsSlice } from '../../store/reducers/reducers';
import { transformFileToBase64 } from '../../utilities/transformFileToBase64';
import { useEffect, useRef } from 'react';

export function RHForm() {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.personsReducer);
  const { addNewly, addRHFData } = personsSlice.actions;
  const { toggleModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      gender: '',
    },
  });

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.gender)
      throw new Error('There is an error in validation of gender!');
    const imageBase64 = await transformFileToBase64(data.image);
    if (typeof imageBase64 !== 'string')
      throw new Error('The result of image transformation is not string');
    const newPerson = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      image: imageBase64,
    };

    dispatch(addNewly(newPerson));
    dispatch(addRHFData(newPerson));
    toggleModal(null);
  }

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
      role="dialog"
      aria-modal="true"
    >
      <h1>React-Hook-Form</h1>
      <label htmlFor="name">
        <div>Please enter your name:</div>
        <input
          {...register('name')}
          name="name"
          type="text"
          placeholder="Enter name"
          ref={inputRef}
        />
        {errors.name && <ValidationError message={errors.name?.message} />}
      </label>
      <label htmlFor="age">
        <div>Please enter your age:</div>
        <input
          {...register('age')}
          name="age"
          type="number"
          placeholder="Enter age"
        />
        {errors.age && <ValidationError message={errors.age?.message} />}
      </label>
      <label htmlFor="email">
        <div>Please enter your email:</div>
        <input
          {...register('email')}
          name="email"
          type="email"
          placeholder="Enter label"
        />
        {errors.email && <ValidationError message={errors.email?.message} />}
      </label>
      <label htmlFor="country">
        <div>Please enter your country:</div>
        <input
          {...register('country')}
          name="country"
          type="text"
          placeholder="Enter country"
          list="countries"
        />
        {errors.country && (
          <ValidationError message={errors.country?.message} />
        )}
        <datalist id="countries">
          {countries.map((elem) => (
            <option key={elem}>{elem}</option>
          ))}
        </datalist>
      </label>
      <label htmlFor="password">
        <div>Please enter your password:</div>
        <input
          {...register('password')}
          name="password"
          type="password"
          placeholder="Enter password"
        />
        {errors.password && (
          <ValidationError message={errors.password?.message} />
        )}
      </label>
      <label htmlFor="confirmation">
        <div>Please enter your confirmation:</div>
        <input
          {...register('confirmation')}
          name="confirmation"
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmation && (
          <ValidationError message={errors.confirmation?.message} />
        )}
      </label>
      <label htmlFor="image">
        <div>Upload file:</div>
        <input {...register('image')} name="image" type="file" />
        {errors.image && <ValidationError message={errors.image.message} />}
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
        {errors.gender && <ValidationError message={errors.gender?.message} />}
      </label>
      <label htmlFor="agreement">
        <input {...register('agreement')} name="agreement" type="checkbox" />I
        agree with Terms & Conditions
        {errors.agreement && (
          <ValidationError message={errors.agreement?.message} />
        )}
      </label>

      <div>
        <Button text="Cancel" onClick={() => toggleModal(null)} />
        <Button text="Save" disabled={!isValid} />
      </div>
    </form>
  );
}

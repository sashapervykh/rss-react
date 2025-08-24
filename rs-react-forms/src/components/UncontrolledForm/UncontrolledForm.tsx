import { Button } from '../button/Button';
import style from '../../shared/form.module.css';
import { useModal } from '../../hooks/useModal/useModal';
import { FormSchema } from '../../models/schema';
import { personsSlice } from '../../store/reducers/reducers';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useRef, useState } from 'react';
import { ValidationError } from '../ValidationError/ValidationError';
import { transformFileToBase64 } from '../../utilities/transformFileToBase64';

interface Errors {
  [key: string | symbol]: string;
}

export function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.personsReducer);
  const { addNewly, addUncontrolledData } = personsSlice.actions;
  const { toggleModal } = useModal();
  const [errors, setErrors] = useState<Errors>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const formDataObject = Object.fromEntries(formData.entries());

    const typedData = FormSchema.safeParse(formDataObject);

    if (typedData.success) {
      if (!typedData.data.gender)
        throw new Error('There is an error in validation of gender!');
      const base64string = await transformFileToBase64(typedData.data.image);
      if (typeof base64string !== 'string')
        throw new Error('Base64 string was not received!');

      const newPerson = {
        name: typedData.data.name,
        age: typedData.data.age,
        gender: typedData.data.gender,
        password: typedData.data.password,
        email: typedData.data.email,
        image: base64string,
      };

      dispatch(addNewly(newPerson));
      dispatch(addUncontrolledData(newPerson));
      toggleModal(null);
    } else {
      const newErrors: Errors = {};
      typedData.error.issues.map((elem) => {
        elem.path.forEach((path) => {
          if (
            !(path in newErrors && path !== 'gender' && path !== 'agreement')
          ) {
            newErrors[path] = elem.message;
          }
          if (
            (path === 'gender' || path === 'agreement') &&
            elem.code === 'invalid_union'
          ) {
            newErrors[path] = elem.errors[0][0].message;
          }
        });
      });
      setErrors(newErrors);
    }
  }

  return (
    <form
      className={style.form}
      onSubmit={(event) => handleSubmit(event)}
      role="dialog"
      aria-modal="true"
    >
      <h1>Uncontrolled Form</h1>
      <label htmlFor="name">
        <div>Please enter your name:</div>
        <input
          name="name"
          type="text"
          placeholder="Enter name"
          ref={inputRef}
        />
        {errors.name && <ValidationError message={errors.name} />}
      </label>
      <label htmlFor="age">
        <div>Please enter your age:</div>
        <input name="age" type="number" placeholder="Enter age" />
        {errors.age && <ValidationError message={errors.age} />}
      </label>
      <label htmlFor="email">
        <div>Please enter your email:</div>
        <input name="email" type="email" placeholder="Enter label" />
        {errors.email && <ValidationError message={errors.email} />}
      </label>
      <label htmlFor="country">
        <div>Please enter your country:</div>
        <input
          name="country"
          type="text"
          list="countries"
          placeholder="Enter country"
        />
        {errors.country && <ValidationError message={errors.country} />}
        <datalist id="countries">
          {countries.map((elem) => (
            <option key={elem}>{elem}</option>
          ))}
        </datalist>
      </label>
      <label htmlFor="password">
        <div>Please enter your password:</div>
        <input name="password" type="password" placeholder="Enter password" />
        {errors.password && <ValidationError message={errors.password} />}
      </label>
      <label htmlFor="confirmation">
        <div>Please enter your confirmation:</div>
        <input
          name="confirmation"
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmation && (
          <ValidationError message={errors.confirmation} />
        )}
      </label>
      <label htmlFor="image">
        <div>Upload file:</div>
        <input name="image" type="file" defaultValue="" />
        {errors.image && <ValidationError message={errors.image} />}
      </label>
      <label htmlFor="gender">
        <div>Choose your gender:</div>
        <input name="gender" type="radio" value="man" /> Man
        <input name="gender" type="radio" value="woman" /> Woman
        {errors.gender && <ValidationError message={errors.gender} />}
      </label>
      <label htmlFor="agreement">
        <input name="agreement" type="checkbox" />I agree with Terms &
        Conditions
        {errors.agreement && <ValidationError message={errors.agreement} />}
      </label>

      <div>
        <Button text="Cancel" onClick={() => toggleModal(null)} />
        <Button text="Save" />
      </div>
    </form>
  );
}

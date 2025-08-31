import { useForm } from 'react-hook-form';
import type { ControlsContextValueType } from '../../models/types';
import { useControls } from '../../hooks/useControls/useControls';
import style from './style.module.css';

export function Widget() {
  const { register, handleSubmit, reset } = useForm<ControlsContextValueType>();
  const { setControls, setModalOpen } = useControls();

  const onSubmit = (data: ControlsContextValueType) => {
    setControls({
      year: data.year ? Number(data.year) : undefined,
      country: data.country ? data.country : undefined,
    });
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={style.label} htmlFor="year">
        <div className={style['label-text']}>Year</div>
        <input
          className={style.input}
          {...register('year')}
          name="year"
          type="number"
          min="1750"
        ></input>
      </label>
      <label className={style.label} htmlFor="country">
        <div className={style['label-text']}>Country</div>
        <input
          className={style.input}
          {...register('country')}
          name="country"
        ></input>
      </label>
      <button className={style.button}>Apply</button>
      <button
        className={style.button}
        onClick={() => {
          reset();
        }}
      >
        Clear
      </button>
      <button
        className={style.button}
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add columns
      </button>
    </form>
  );
}

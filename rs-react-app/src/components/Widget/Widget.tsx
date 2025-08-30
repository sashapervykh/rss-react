import { useForm } from 'react-hook-form';
import type { ControlsContextValueType } from '../../models/types';
import { useControls } from '../../hooks/useControls/useControls';

export function Widget() {
  const { register, handleSubmit, reset } = useForm<ControlsContextValueType>();
  const { setControls, setModalOpen } = useControls();

  const onSubmit = (data: ControlsContextValueType) => {
    setControls({
      year: data.year ? Number(data.year) : undefined,
      country: data.country ? data.country : undefined,
      columns: data.columns ? data.columns : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="year">
        Year
        <input
          {...register('year')}
          name="year"
          type="number"
          min="1750"
        ></input>
      </label>
      <label htmlFor="country">
        Country
        <input {...register('country')} name="country"></input>
      </label>
      <button>Apply</button>
      <button
        type="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add columns
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Clear
      </button>
    </form>
  );
}

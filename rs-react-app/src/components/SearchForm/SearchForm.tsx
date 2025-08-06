import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePage } from '../../hooks/usePagination/usePagination';
import { useTheme } from '../../hooks/useTheme/useTheme';
import { BreakingButton } from '../BreakingButton/BreakingButton';
import { Button } from '../Button/Button';

import style from './style.module.css';

export function SearchForm() {
  const { theme } = useTheme();
  const { savedInput, setSavedInput, updateStorageBySearch } =
    useLocalStorage();
  const { setPage } = usePage();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavedInput(event.target.value);
  };

  return (
    <section>
      <form
        className={style.form}
        onSubmit={async (event) => {
          event.preventDefault();
          updateStorageBySearch(savedInput.trim());
          setPage(1);
        }}
      >
        <label>
          <input
            className={`${style.input} ${style[`input-${theme}`]} `}
            onChange={handleChange}
            placeholder="Enter your request"
            value={savedInput}
          ></input>
        </label>
        <Button text="Search" type="submit" />
        <BreakingButton />
      </form>
    </section>
  );
}

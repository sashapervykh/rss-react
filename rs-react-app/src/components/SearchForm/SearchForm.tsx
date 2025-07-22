import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { getLocalStorageData } from '../../utilities/getLocalStorageData';
import { setLocalStorageData } from '../../utilities/setLocalStorageData';
import style from './style.module.css';
import { BreakingButton } from '../BreakingButton/BreakingButton';

interface Props {
  handleSearch: (input: string) => Promise<void>;
  disabled: boolean;
}

export function SearchForm(props: Props) {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const savedInput = getLocalStorageData() ?? '';
    props.handleSearch(savedInput);
    setUserInput(savedInput);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <section>
      <form
        className={style.form}
        onSubmit={async (event) => {
          event.preventDefault();
          setLocalStorageData(userInput.trim());
          props.handleSearch(userInput.trim());
        }}
      >
        <label>
          <input
            className={style.input}
            onChange={handleChange}
            placeholder="Enter your request"
            value={userInput}
            disabled={props.disabled}
          ></input>
        </label>
        <Button text="Search" type="submit" disabled={props.disabled} />
        <BreakingButton />
      </form>
    </section>
  );
}

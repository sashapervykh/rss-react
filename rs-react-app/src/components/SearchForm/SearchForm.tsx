import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { getDataFromApi } from '../../api/getDataFromApi';

export class SearchForm extends Component {
  render(): ReactNode {
    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          getDataFromApi({ input: 'mars' });
        }}
      >
        <input></input>
        <Button text="Search" type="submit"></Button>
      </form>
    );
  }
}

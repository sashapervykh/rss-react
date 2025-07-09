import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';

export class SearchForm extends Component {
  render(): ReactNode {
    return (
      <form>
        <input></input>
        <Button text="Search" type="submit"></Button>
      </form>
    );
  }
}

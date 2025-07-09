import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';

interface Props {
  handleSearch: (input: string) => Promise<void>;
}

export class SearchForm extends Component<Props> {
  render(): ReactNode {
    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          this.props.handleSearch('mars');
        }}
      >
        <input></input>
        <Button text="Search" type="submit"></Button>
      </form>
    );
  }
}

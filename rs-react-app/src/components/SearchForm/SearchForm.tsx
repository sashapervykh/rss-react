import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';

interface Props {
  handleSearch: (input: string) => Promise<void>;
}

interface State {
  input: string | undefined;
}

export class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: undefined };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  render(): ReactNode {
    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!this.state.input) return;
          this.props.handleSearch(this.state.input);
        }}
      >
        <input onChange={this.handleChange}></input>
        <Button text="Search" type="submit"></Button>
      </form>
    );
  }
}

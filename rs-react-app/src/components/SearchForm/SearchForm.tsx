import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { getLocalStorageData } from '../../utilities/getLocalStorageData';
import { setLocalStorageData } from '../../utilities/setLocalStorageData';

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

  componentDidMount(): void {
    const savedInput = getLocalStorageData();
    if (!savedInput) return;
    this.props.handleSearch(savedInput);
    this.setState({ input: savedInput });
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
          setLocalStorageData(this.state.input);
          this.props.handleSearch(this.state.input);
        }}
      >
        <input
          onChange={this.handleChange}
          placeholder="Enter your request"
          value={this.state.input ?? ''}
        ></input>
        <Button text="Search" type="submit"></Button>
      </form>
    );
  }
}

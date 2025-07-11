import { Component, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { getLocalStorageData } from '../../utilities/getLocalStorageData';
import { setLocalStorageData } from '../../utilities/setLocalStorageData';
import style from './style.module.css';
import { BreakingButton } from '../BreakingButton/BreakingButton';

interface Props {
  handleSearch: (input: string) => Promise<void>;
  disabled: boolean;
}

interface State {
  input: string | undefined;
  error: undefined | boolean;
}

export class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: undefined, error: false };
  }

  componentDidMount(): void {
    try {
      const savedInput = getLocalStorageData();
      if (!savedInput) return;
      this.props.handleSearch(savedInput);
      this.setState({ input: savedInput });
    } catch {
      console.log(3);
      this.setState({ error: true });
    }
  }

  componentDidUpdate(): void {
    console.log('1');
    if (this.state.error) {
      console.log('error');
      throw new Error('something wrong');
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  render(): ReactNode {
    return (
      <form
        className={style.form}
        onSubmit={async (event) => {
          event.preventDefault();
          if (!this.state.input) return;
          setLocalStorageData(this.state.input);
          this.props.handleSearch(this.state.input);
        }}
      >
        <label>
          <input
            className={style.input}
            onChange={this.handleChange}
            placeholder="Enter your request"
            value={this.state.input ?? ''}
            disabled={this.props.disabled}
          ></input>
        </label>
        <Button text="Search" type="submit" disabled={this.props.disabled} />
        <BreakingButton />
      </form>
    );
  }
}

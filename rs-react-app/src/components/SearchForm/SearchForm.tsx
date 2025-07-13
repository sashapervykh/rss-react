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
}

export class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: undefined };
  }

  componentDidMount(): void {
    const savedInput = getLocalStorageData() ?? '';
    this.props.handleSearch(savedInput);
    this.setState({ input: savedInput });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  render(): ReactNode {
    return (
      <section>
        <form
          className={style.form}
          onSubmit={async (event) => {
            event.preventDefault();
            const input = this.state.input ?? '';
            setLocalStorageData(input);
            this.props.handleSearch(input);
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
      </section>
    );
  }
}

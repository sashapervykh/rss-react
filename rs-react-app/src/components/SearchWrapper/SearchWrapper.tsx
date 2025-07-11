import { Component, type ReactNode } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import {
  errorScheme,
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import { Spinner } from '../Spinner/Spinner';

interface State {
  results: SearchResultType[] | undefined;
  pending: boolean;
  error: undefined | string;
}

export class SearchWrapper extends Component<object, State> {
  constructor(props = {}) {
    super(props);
    this.state = { results: undefined, pending: false, error: undefined };
  }

  handleSearch = async (input: string) => {
    try {
      this.setState({ pending: true });
      const results = await getDataFromApi({ input: input });
      this.setState({ results: results, pending: false });
    } catch (error) {
      const message = errorScheme.parse(error).message;
      this.setState({ error: message });
      throw new Error(message);
    }
  };

  componentDidUpdate(): void {
    if (this.state.error) {
      throw new Error(this.state.error);
    }
  }

  render(): ReactNode {
    return (
      <div>
        <SearchForm
          handleSearch={this.handleSearch}
          disabled={this.state.pending}
        />
        {this.state.pending && <Spinner />}
        {!this.state.pending && <SearchResults results={this.state.results} />}
      </div>
    );
  }
}

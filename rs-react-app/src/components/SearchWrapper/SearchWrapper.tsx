import { Component, type ReactNode } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import {
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import { Spinner } from '../Spinner/Spinner';

interface State {
  results: SearchResultType[] | undefined;
  pending: boolean;
}

export class SearchWrapper extends Component<object, State> {
  constructor(props = {}) {
    super(props);
    this.state = { results: undefined, pending: false };
  }

  handleSearch = async (input: string) => {
    this.setState({ pending: true });
    const results = await getDataFromApi({ input: input });
    this.setState({ results: results, pending: false });
  };

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

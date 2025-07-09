import { Component, type ReactNode } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import {
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';

interface State {
  results: SearchResultType[] | undefined;
}

export class SearchWrapper extends Component<object, State> {
  constructor(props = {}) {
    super(props);
    this.state = { results: undefined };
  }

  handleSearch = async (input: string) => {
    const results = await getDataFromApi({ input: input });
    this.setState({ results: results });
  };

  render(): ReactNode {
    return (
      <div>
        <SearchForm handleSearch={this.handleSearch} />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

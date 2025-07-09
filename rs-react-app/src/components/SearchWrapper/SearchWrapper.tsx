import { Component, type ReactNode } from 'react';
import { SearchForm } from '../SearchForm/SearchForm';

export class SearchWrapper extends Component {
  render(): ReactNode {
    return (
      <div>
        <SearchForm></SearchForm>
      </div>
    );
  }
}

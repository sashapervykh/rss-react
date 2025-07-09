import { Component, type ReactNode } from 'react';
import type { SearchResultType } from '../../api/getDataFromApi';

interface Props {
  results?: SearchResultType[];
}

export class SearchResults extends Component<Props> {
  render(): ReactNode {
    return <div>{this.props.results ? 'Results' : 'No results'}</div>;
  }
}

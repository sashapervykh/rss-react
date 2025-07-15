import { Component, type ReactNode } from 'react';
import { PageTitle } from '../PageTitle/PageTitle';
import { SearchWrapper } from '../SearchWrapper/SearchWrapper';

export class PageMain extends Component {
  render(): ReactNode {
    return (
      <main>
        <PageTitle />
        <SearchWrapper />
      </main>
    );
  }
}

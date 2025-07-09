import { Component, type ReactNode } from 'react';
import { PageTitle } from '../PageTitle/PageTitle';

export class PageMain extends Component {
  render(): ReactNode {
    return (
      <main>
        <PageTitle />
      </main>
    );
  }
}

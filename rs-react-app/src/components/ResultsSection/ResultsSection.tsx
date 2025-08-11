import { Outlet, useSearchParams } from 'react-router';

import { SearchResults } from '../SearchResults/SearchResults';

import style from './style.module.css';

export function ResultsSection() {
  const [searchParams, _] = useSearchParams();

  const details = searchParams.get('details');

  return (
    <section className={style['results-section']}>
      <SearchResults></SearchResults>
      {details && <Outlet />}
    </section>
  );
}

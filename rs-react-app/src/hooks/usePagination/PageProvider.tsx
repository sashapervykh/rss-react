import { useState } from 'react';
import { PageContext } from './PaginationContext';
import { useSearchParams } from 'react-router';

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, _] = useSearchParams();
  const [page, setPage] = useState<string>(searchParams.get('page') ?? '1');

  const PageContextValue = {
    page,
    setPage,
  };

  return (
    <PageContext.Provider value={PageContextValue}>
      {children}
    </PageContext.Provider>
  );
};

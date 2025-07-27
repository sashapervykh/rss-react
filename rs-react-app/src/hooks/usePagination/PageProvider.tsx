import { useState } from 'react';
import { PageContext } from './PaginationContext';

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(1);

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

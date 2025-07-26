import { createContext } from 'react';

interface PageContextType {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageContext = createContext<PageContextType>({
  page: '1',
  setPage: () => {},
});

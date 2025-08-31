import { createContext } from 'react';
import type { ColumnsContextType } from '../models/types';

export const ColumnsContext = createContext<ColumnsContextType>({
  columns: [],
  setColumns: () => {},
});

import { useContext } from 'react';
import { PageContext } from './PaginationContext';

export const usePage = () => useContext(PageContext);

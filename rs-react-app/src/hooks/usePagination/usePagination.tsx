import { useContext } from 'react';

import { PageContext } from '../../context/PaginationContext';

export const usePage = () => useContext(PageContext);

import { useContext } from 'react';
import { ColumnsContext } from '../../context/columnsContext';

export const useColumns = () => useContext(ColumnsContext);

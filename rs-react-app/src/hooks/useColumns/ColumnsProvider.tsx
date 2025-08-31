import { useState } from 'react';
import { ColumnsContext } from '../../context/columnsContext';

export const ColumnsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<string[]>([]);

  const controlsContextValue = {
    columns,
    setColumns,
  };

  return (
    <ColumnsContext.Provider value={controlsContextValue}>
      {children}
    </ColumnsContext.Provider>
  );
};

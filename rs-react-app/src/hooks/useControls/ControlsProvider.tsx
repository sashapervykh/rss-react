import { useState } from 'react';
import type { ControlsContextValueType } from '../../models/types';
import { ControlsContext } from '../../context/controlsContext';

export const ControlsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [controls, setControls] = useState<ControlsContextValueType>({
    year: undefined,
    country: undefined,
    columns: undefined,
  });

  const controlsContextValue = {
    controls,
    setControls,
  };

  return (
    <ControlsContext.Provider value={controlsContextValue}>
      {children}
    </ControlsContext.Provider>
  );
};

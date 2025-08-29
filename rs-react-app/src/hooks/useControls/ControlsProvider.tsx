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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const controlsContextValue = {
    controls,
    modalOpen,
    setControls,
    setModalOpen,
  };

  return (
    <ControlsContext.Provider value={controlsContextValue}>
      {children}
    </ControlsContext.Provider>
  );
};

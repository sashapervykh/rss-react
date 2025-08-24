import { useState } from 'react';

import { ModalContext } from '../../context/ModalContext';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<'uncontrolled' | 'rhf' | null>(null);

  const modalContextValue = {
    modal,
    toggleModal: setModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};

import { createContext } from 'react';

interface ModalContextType {
  modal: 'uncontrolled' | 'rhf' | null;
  toggleModal: React.Dispatch<
    React.SetStateAction<'uncontrolled' | 'rhf' | null>
  >;
}

export const ModalContext = createContext<ModalContextType>({
  modal: null,
  toggleModal: () => {},
});

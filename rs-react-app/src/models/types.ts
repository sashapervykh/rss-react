export interface ControlsContextValueType {
  year: number | undefined | '';
  country: string | undefined | '';
  columns: string[] | undefined | '';
}

export interface ControlsContextType {
  controls: ControlsContextValueType;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setControls: React.Dispatch<React.SetStateAction<ControlsContextValueType>>;
}

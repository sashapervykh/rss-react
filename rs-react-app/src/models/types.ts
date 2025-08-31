export interface ControlsContextValueType {
  year: number | undefined | '';
  country: string | undefined | '';
}

export interface ControlsContextType {
  controls: ControlsContextValueType;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setControls: React.Dispatch<React.SetStateAction<ControlsContextValueType>>;
}

export interface ColumnsContextType {
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ControlsContextValueType {
  year: number | undefined | '';
  country: string | undefined | '';
  columns: string[] | undefined | '';
}

export interface ControlsContextType {
  controls: ControlsContextValueType;
  setControls: (controls: ControlsContextValueType) => void;
}

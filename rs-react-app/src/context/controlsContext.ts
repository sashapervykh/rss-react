import { createContext } from 'react';
import type { ControlsContextType } from '../models/types';

export const ControlsContext = createContext<ControlsContextType>({
  controls: {
    year: undefined,
    country: undefined,
    columns: undefined,
  },
  setControls: () => {},
});

import { useContext } from 'react';
import { ControlsContext } from '../../context/controlsContext';

export const useControls = () => useContext(ControlsContext);

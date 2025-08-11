import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import type { Reducers } from '../store/store';
import type { Dispatch } from '@reduxjs/toolkit';

export const useCustomDispatch = () => useDispatch<Dispatch>();
export const useCustomSelector: TypedUseSelectorHook<Reducers> = useSelector;

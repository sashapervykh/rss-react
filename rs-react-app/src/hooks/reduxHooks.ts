import type { Dispatch } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { Reducers } from '../store/store';

export const useCustomDispatch = () => useDispatch<Dispatch>();
export const useCustomSelector: TypedUseSelectorHook<Reducers> = useSelector;

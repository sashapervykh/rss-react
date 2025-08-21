import { useDispatch, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootType } from '../store/store';
import { useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../utils/types';

export const useDispatch = dispatchHook.withTypes<AppDispatch | AppThunk>()
export const useSelector = selectorHook.withTypes<RootState>()
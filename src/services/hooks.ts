import {
  //TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../utils/types';

// Теперь этот хук «знает» структуру хранилища
//export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();


export const useDispatch = dispatchHook.withTypes<AppDispatch | AppThunk>()
export const useSelector = selectorHook.withTypes<RootState>()
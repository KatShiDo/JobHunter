import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { authReducer, themeReducer } from '@/features';
import { userReducer } from '@/entities';
import { commonReducer } from '@/entities';

const store = configureStore({
  reducer: {
    commonReducer: commonReducer,
    themeReducer: themeReducer,
    userReducer: userReducer,
    authReducer: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

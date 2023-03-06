import { AnyAction, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// rootReducers;
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;

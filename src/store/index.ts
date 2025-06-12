import { configureStore, combineReducers } from '@reduxjs/toolkit';
import labelReducer, { LabelsState } from './features/labelSlice';

export interface RootState {
  labels: LabelsState;
}

const getLabelsFromLocaleStorage = (): Partial<RootState> | undefined => {
  try {
    const labelsFromLocalStorage = localStorage.getItem('labels');
    if (labelsFromLocalStorage === null) return undefined;

    return JSON.parse(labelsFromLocalStorage) as Partial<RootState>;

  } catch (err) {
    console.error("err:", err);
    return undefined;
  }
};

const setLabelsToLocaleStorage = (state: RootState) => {
  try {
    const labelsToLocalStorage = JSON.stringify(state);
    localStorage.setItem('labels', labelsToLocalStorage);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const preloadedState = getLabelsFromLocaleStorage();

const rootReducer = combineReducers({
  labels: labelReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  setLabelsToLocaleStorage(store.getState());
});
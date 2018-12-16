import { createStore } from 'redux';
import { rootReducer, initialState } from '../reducers/index';

export const store = createStore(rootReducer, initialState);

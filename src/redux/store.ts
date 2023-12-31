import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;

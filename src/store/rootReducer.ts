import { combineReducers } from 'redux';

import { settingsReducer } from '../Settings';
import { networkReducer } from './shared/reducers';

const rootReducer = combineReducers({
  settings: settingsReducer,
  networkStatus: networkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

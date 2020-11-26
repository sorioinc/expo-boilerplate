import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import rootReducer from './rootReducer';

export { RootState } from './rootReducer';

export * from './shared';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

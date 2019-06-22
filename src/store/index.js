import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import reducers from './../reducers'

// const middleWare = applyMiddleware(ReduxThunk)(createStore);

// export default middleWare(reducers, {});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

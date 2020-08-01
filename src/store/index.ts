/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as reduxModule from 'redux';
import thunk from 'redux-thunk';
import createReducer from '../reducers';

const globalAny: any = global;
const reduxModuleAny: any = reduxModule;
const { applyMiddleware, compose, createStore } = reduxModule;
/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModuleAny.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  globalAny.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? globalAny.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store: any = createStore(createReducer(), enhancer);

store.asyncReducers = {};

export const injectReducer = (key: any, reducer: any): any => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;

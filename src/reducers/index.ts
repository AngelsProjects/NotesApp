/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { combineReducers } from 'redux';
import notesView from './notes.reducer';

export default (asyncReducers?: any) =>
  combineReducers({
    notesView,
    ...asyncReducers
  });

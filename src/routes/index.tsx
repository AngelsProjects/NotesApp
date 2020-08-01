/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import { Redirect } from 'react-router-dom';
import notesRoutes from './notes.routes';

export default [
  ...notesRoutes,
  {
    path     : '/',
    exact    : true,
    component: () => <Redirect to='/notes' />
  },
  { component: () => <Redirect to='/notes' /> }
];

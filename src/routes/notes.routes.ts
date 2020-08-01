import { lazy } from 'react';

export default [
  {
    path     : '/notes',
    component: lazy(() => import('@views/Notes'))
  }
];

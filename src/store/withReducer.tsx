/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { injectReducer } from './index';

const withReducer = (key: any, reducer: any) => (WrappedComponent: any) => {
  injectReducer(key, reducer);

  return (props: any) => <WrappedComponent {...props} />;
};

export default withReducer;

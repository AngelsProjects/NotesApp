/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import Loading from './Loading';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */
export default function CustomSuspense(
  props: any = {
    loadingProps: {
      delay: 0
    }
  }
) {
  return (
    <Suspense fallback={<Loading {...props.loadingProps} t={props.t} />}>
      {props.children}
    </Suspense>
  );
}

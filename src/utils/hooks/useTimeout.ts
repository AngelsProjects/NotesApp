/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useRef } from 'react';

export default function useTimeout(callback: any, delay: number) {
  const callbackRef: any = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (delay && callback && typeof callback === 'function') {
      timer = setTimeout(callbackRef.current, delay || 0);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [callback, delay]);
}

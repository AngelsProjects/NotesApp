/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import MobileDetect from 'mobile-detect';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React, { createRef, useCallback, useEffect, useRef } from 'react';
import withRouterAndRef from '../store/withRouterAndRef';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const handlerNameByEvent: any = {
  'ps-scroll-y'     : 'onScrollY',
  'ps-scroll-x'     : 'onScrollX',
  'ps-scroll-up'    : 'onScrollUp',
  'ps-scroll-down'  : 'onScrollDown',
  'ps-scroll-left'  : 'onScrollLeft',
  'ps-scroll-right' : 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end'  : 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end'  : 'onXReachEnd'
};
Object.freeze(handlerNameByEvent);

export default withRouterAndRef(React.forwardRef((props: any, ref: any) => {
  ref = ref || createRef();
  const ps: any = useRef(null);
  const handlerByEvent = useRef(new Map());

  const hookUpEvents = useCallback(() => {
    Object.keys(handlerNameByEvent).forEach((key: string) => {
      const callback = props[handlerNameByEvent[key]];
      if (callback) {
        const handler = () => callback(ref.current);
        handlerByEvent.current.set(key, handler);
        ref.current.addEventListener(key, handler, false);
      }
    });
    // eslint-disable-next-line
  }, [ref]);

  const unHookUpEvents = useCallback(() => {
    handlerByEvent.current.forEach((value, key) => {
      if (ref.current) {
        ref.current.removeEventListener(key, value, false);
      }
    });
    handlerByEvent.current.clear();
  }, [ref]);

  const destroyPs = useCallback(() => {
    // console.info("destroy::ps");

    unHookUpEvents();

    if (!ps.current) {
      return;
    }
    ps.current.destroy();
    ps.current = null;
  }, [unHookUpEvents]);

  const createPs = useCallback(() => {
    // console.info("create::ps");

    if (isMobile || !ref || ps.current) {
      return;
    }

    ps.current = new PerfectScrollbar(ref.current, props.option);

    hookUpEvents();
  }, [hookUpEvents, props.option, ref]);

  useEffect(() => {
    function updatePs() {
      if (!ps.current) {
        return;
      }
      ps.current.update();
    }

    updatePs();
  });

  useEffect(() => {
    if (true) {
      createPs();
    } else {
      destroyPs();
    }
  }, [createPs, true, destroyPs]);

  // createPs();

  const scrollToTop = useCallback(() => {
    if (ref && ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [ref]);

  useEffect(() => {
    if (props.scrollToTopOnChildChange) {
      scrollToTop();
    }
  }, [scrollToTop, props.children, props.scrollToTopOnChildChange]);

  useEffect(
    () =>
      props.history.listen(() => {
        if (props.scrollToTopOnRouteChange) {
          scrollToTop();
        }
      }),
    [scrollToTop, props.history, props.scrollToTopOnRouteChange]
  );

  useEffect(
    () => () => {
      destroyPs();
    },
    [destroyPs]
  );

  // console.info('render::ps');
  return (
    <div
      id={props.id}
      className={clsx(props.className)}
      style={
        !isMobile
          ? {
            position: 'relative',
            overflow: 'hidden'
          }
          : {}
      }
      ref={ref}
    >
      {props.children}
    </div>
  );
}));

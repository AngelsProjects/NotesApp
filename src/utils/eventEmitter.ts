/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
export default class EventEmitter {
  events: any;

  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName: string | number) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName: any, fn: (...args: any[]) => void) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName: any, fn: any) {
    const thisAny: any = this;

    const onceFn = (...args: any[]) => {
      thisAny.removeListener(eventName, onceFn);
      fn.apply(thisAny, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName: any, ...args: any[]) {
    const thisAny: any = this;
    thisAny._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      function (fn: any) {
        const container: any = thisAny;
        fn.apply(container, args);
      // eslint-disable-next-line no-extra-bind
      }.bind(thisAny)
    );
  }

  removeListener(eventName: any, fn: (...args: any[]) => void) {
    this._getEventListByName(eventName).delete(fn);
  }
}

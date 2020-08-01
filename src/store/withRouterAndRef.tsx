/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { withRouter } from 'react-router-dom';

export default  (WrappedComponent: any) => {
  class InnerComponentWithRef extends React.Component<any> {
    render() {
      const { forwardRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }
  const ComponentWithRouter = withRouter(
    InnerComponentWithRef 
  );
  return React.forwardRef((props:any, ref:any) => (
    <ComponentWithRouter {...props} forwardRef={ref} />
  ));
};

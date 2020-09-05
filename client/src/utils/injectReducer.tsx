import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }: any) => (WrappedComponent: JSX.IntrinsicAttributes) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    // @ts-ignore
    static displayName = `withReducer(${WrappedComponent.displayName ||
    // @ts-ignore
      WrappedComponent.name ||
      'Component'})`;

    constructor(props: {}, context: { store: any; }) {
      super(props, context);

      getInjectors(context.store).injectReducer(key, reducer);
    }

    render() {
      // @ts-ignore
      return <WrappedComponent {...this.props} />;
    }
  }

  // @ts-ignore
  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

const useInjectReducer = ({ key, reducer }: any) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  });
};

export { useInjectReducer };

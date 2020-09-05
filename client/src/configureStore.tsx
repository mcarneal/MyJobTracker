/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createReducer from './reducers';
import { History } from 'history';

export default function configureStore(initialState = {}, history: History) {
    let composeEnhancers = compose;

    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    /* istanbul ignore next */
    // if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        /* eslint-disable no-underscore-dangle */

        // if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        //     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

        // NOTE: Uncomment the code below to restore support for Redux Saga
        // Dev Tools once it supports redux-saga version 1.x.x
        // if (window.__SAGA_MONITOR_EXTENSION__)
        //   reduxSagaMonitorOptions = {
        //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
        //   };
        /* eslint-enable */
    // }

    // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    // Create the store with two middlewares
    // 1. thunk: Makes redux-thunk work
    // 2. routerMiddleware: Syncs the location/URL path to the state

    const middlewares = [thunk ,routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers)
    );

    // @ts-ignore
    store.injectedReducers = {}; // Reducer registry

    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept('./reducers', () => {
            //@ts-ignore
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import 'sanitize.css/sanitize.css';
import App from './containers/App';
import Login from './containers/Login'


import configureStore from './configureStore';
const initialState = {};


const store = configureStore(initialState, history);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {/*<App />*/}
                <Login />
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


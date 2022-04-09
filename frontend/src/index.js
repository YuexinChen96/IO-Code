import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';


const initialState = { init : false };

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case 'init':
            return {
                init : true,
                state.nmi_list : action.nmi_list,
                state.nmi_id : action.nmi_id,
            }
        case 'update':
            return {
                init : true
            };
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
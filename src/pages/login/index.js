import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {connect, Provider} from 'react-redux';
import './login.css';
import rootReducer from './reducers'
const store = createStore(rootReducer);
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

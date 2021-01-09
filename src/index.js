import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import GlobalState from "./store/globalState";

import './scss/main.scss';


const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
        <Provider store= {store}>
           
            <GlobalState>
               
                <App/>

            </GlobalState>

        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

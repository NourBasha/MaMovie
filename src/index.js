import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas/sagas';

import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import GlobalState from "./store/globalState";

import './scss/main.scss';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  
        <Provider store= {store}>
           
            <GlobalState>
               
                <App/>

            </GlobalState>

        </Provider>
  ,
  document.getElementById('root')
);

import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from 'redux-saga'

import myApp from "./myApp"
import mySaga from "./mySaga"

const sagaMiddleware = createSagaMiddleware();

const store = createStore(myApp, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default function ({children}) {
    return <Provider store={store}>
        {children}
    </Provider>
}
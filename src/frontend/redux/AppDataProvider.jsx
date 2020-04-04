import React from "react"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger"

import myApp from "./myApp"
import mySaga from "./mySaga"

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    // logger
)(createStore);
const store = createStoreWithMiddleware(myApp);

sagaMiddleware.run(mySaga);

export default function ({children}) {
    return <Provider store={store}>{children}</Provider>;
}
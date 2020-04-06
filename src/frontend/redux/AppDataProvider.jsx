import React from "react"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger"
import {useCookies} from "react-cookie";

import myApp from "./myApp"
import mySaga from "./mySaga"

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// middlewares.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(myApp);

sagaMiddleware.run(mySaga);

export default function ({children}) {
    // console.log("useCookies", useCookies);

    const [cookies, setCookies, removeCookies] = useCookies();
    // console.log(cookies, setCookies, removeCookies)

    return <Provider store={store}>{children}</Provider>;
}
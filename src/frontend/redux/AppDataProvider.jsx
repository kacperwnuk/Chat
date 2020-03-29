import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from "redux"
import rootReducer from "./rsoApp"

const store = createStore(rootReducer);

export default function ({children}) {
    return <Provider store={store}>
        {children}
    </Provider>
}
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';
import { compose } from "redux";

const initialState = {};

const store = configureStore({
    reducer: rootReducer, // Empty for now
    }, 
    initialState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;

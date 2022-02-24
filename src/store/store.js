import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { RootReducers } from "../Reducers/RootReducers";



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    RootReducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    
)
import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";


export const RootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    authReducer: authReducer
    
    // auth,
})

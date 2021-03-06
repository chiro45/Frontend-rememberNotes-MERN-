import { types } from "../types/types";

const initialState = {
        events:[],
        activeEvent: null
    
}





export const calendarReducer = (state = initialState, action)=>{
        switch (action.type) {
             case types.eventAddnew: 
                return{
                     ...state, 
                     events: [
                     ...state.events,
                     action.payload
                     ]
            }

            case types.eventSetActive:
            return{
                ...state, 
                activeEvent: action.payload
            }

            case types.eventClearActiveEvent:
                return {
                    ...state,
                    activeEvent: null
                }

            case types.eventUpdate:
                return {
                    ...state,
                    events: state.events.map( 
                        e =>  e.id === action.payload.id ? action.payload : e
                    )
                }
            case types.eventDelete:
            return {
                ...state,
                events: state.events.filter( 
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
                
            }
            case types.eventLogout:
            return {
                ...initialState
                
            }
            case types.eventLoader:
                return{
                    ...state,
                    events: [...action.payload]
                }
        
            default:
                return state;
        }
}
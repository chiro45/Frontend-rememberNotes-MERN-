import { types } from "../types/types";
import moment from 'moment'
const initialState = {
        events:[{title: 'cumpleaños jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hour').toDate(),
        bgcolor: '#fafafafa',
        notes: 'Comprar el pastel',
        user:{
          _id: new Date().getTime(),
          name: 'Luciano'
        }
    }],
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
        
            default:
                return state;
        }
}
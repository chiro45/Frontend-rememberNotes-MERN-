import { types } from "../types/types"



export const addNew = (event)=>({
    type: types.eventAddnew,
    payload: event    
});


export const clearActiveNote = ()=>({
    type: types.eventClearActiveEvent
})
export const eventUpdate = (e)=>({
    type: types.eventUpdate,
    payload: e
})

export const eventDelete = ()=>({
    type: types.eventDelete
  
})

export const setActive = (event)=>({
    type: types.eventSetActive,
    payload: event
})

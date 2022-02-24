import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"

export const startAddNew = (event)=>{

    return async(dispath, getState)=>{

        const {uid, name} = getState().authReducer
        
        try {
            const resp = await fetchConToken('events',event, 'POST')
            const body = await resp.json()
           
            if(body.ok){
                event.id = body.eventoGuardado.id;
                event.user = {
                   _id: uid, 
                    name
                }
                dispath(addNew(event))
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('error','No se ha guardado','error')
        }

        

    }    


}

const addNew = (event)=>({
    type: types.eventAddnew,
    payload: event    
});


export const clearActiveNote = ()=>({
    type: types.eventClearActiveEvent
})

export const setActive = (event)=>({
    type: types.eventSetActive,
    payload: event
})

export const startEventDelete = ()=>{
    return async(dispath, getState)=>{
        const {id} = getState().calendar.activeEvent
        try {
            const resp = await fetchConToken(`events/${id}`, {}, "DELETE")
            const body = await resp.json()
             if(body.ok){
                 dispath(eventDelete())
                 Swal.fire('success','Evento Elminado','success')
             }
            
           } catch (error) {
               console.log(error)
               Swal.fire('error', 'No se pudo Eliminar el evento', 'error')
           }
        }
    }



const eventDelete = ()=>({
    type: types.eventDelete
  
})




export const eventStartLoading = ()=>{

    return async(dispath)=>{

       try {
           const resp =  await fetchConToken('events')
           const body = await resp.json()

           const events =   prepareEvents( body.eventos)

            dispath(eventLoader(events))
          
       } catch (error) {
           console.log(error)
           Swal.fire('error','No se pudieron cargar los eventos','error')
       }


    }

}

const eventLoader = (eventos)=>({
    type : types.eventLoader,
    payload : eventos
})


export const startEventUpdated = (evento)=>{
    return async(dispath)=>{
       try {
        const resp = await fetchConToken(`events/${evento.id}`, evento, "PUT")
        const body = await resp.json()
         if(body.ok){
             dispath(eventUpdated(evento))
             Swal.fire('success','Evento Actualizado','success')
         }
        
       } catch (error) {
           console.log(error)
           Swal.fire('error', 'No se pudo actualizar el evento', 'error')
       }
    }
}
const eventUpdated = (evento) =>({
    type: types.eventUpdate,
    payload: evento
})

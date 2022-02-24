import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"


export const startLogin = (email, passwd)=>{
    return async(dispatch)=>{
        
      const resp = await fetchSinToken('auth',{email, passwd}, 'POST')
      const body = await resp.json()
      
      
      if(body.ok){
        localStorage.setItem('token',body.token )
        localStorage.setItem('token-init-date', new Date().getTime() )
        dispatch(login({
            uid: body.uid,
            name: body.name
        }))
    }else{
        Swal.fire('Error', body.msg,'error')
    }

      

    }
} 


export const startRegister = (name,email, passwd)=>{
    return async(dispatch)=>{
        const resp = await fetchSinToken('auth/register',{name, email, passwd}, 'POST')
        const body = await resp.json()
        
        if(body.ok){
            localStorage.setItem('token',body.token )
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            Swal.fire('Creado', "Usuario creado con exito",'success')
        }else{
            Swal.fire('Error', body.msg,'error')
      }
    }
}

export const startChecking = ()=>{
    return async(dispatch)=>{
        const resp = await fetchConToken('auth/renew')
        const body = await resp.json()
        if(body.ok){
            localStorage.setItem('token',body.token )
            localStorage.setItem('token-init-date', new Date().getTime() )

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
           
        }else{
            dispatch(chekingFinish())
      }
    }
    }


const chekingFinish = ()=>({
    type: types.authChekingFinish
})


const login = (user)=>({
    type: types.authlogin,
    payload: user
})


import { Navigate, Routes } from "react-router-dom"




//rutas que se pueden acceder ya una vez que el usuario ha sido logueado

export const PrivateRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    
return(
    <Routes{...rest}
    component={(props)=>(
        (isAuthenticated)
        ?(<Component {...props}/>)
        :(<Navigate to ='auth/login'/>)
    )}

    />
   

)
}


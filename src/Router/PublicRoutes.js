import React from 'react';


import { Routes, Navigate } from 'react-router-dom';


export const PublicRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Routes { ...rest }
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Navigate to ='/'/>)
                    : ( <Component { ...props } /> )
            )}
        
        />
    )
}



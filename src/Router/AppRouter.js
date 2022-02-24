
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../Componentes/Auth/LoginScreen';
import { CalendarScreen } from '../Componentes/calendar/CalendarScreen';
import { NothingHere } from '../Componentes/Error/NothingHere';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
export const AppRouter = () => {
  const dispatch = useDispatch()
  const {cheking, uid} = useSelector( state => state.authReducer )
  useEffect(() => {
    dispatch(startChecking())
    
  }, [dispatch]);
  
  if(cheking){
    return (<h1>Espere....</h1>)
  }

  return (
    <BrowserRouter>
    <Routes>
        
        <PublicRoutes 
        exact 
        path='/login' 
        component={<LoginScreen/>} 
        isAuthenticated={!!uid}
        />

        <PrivateRoutes  
        exact 
        path='/' 
        component={<CalendarScreen/>}
         isAuthenticated={!!uid}/>
        <Route
            path="*"
            element={<NothingHere/>}
    />
        

    </Routes>
    </BrowserRouter>
  )
}

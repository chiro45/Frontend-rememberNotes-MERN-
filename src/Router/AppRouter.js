
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { startChecking } from '../actions/auth';
import {PublicRoute} from './PublicRoutes'
import {PrivateRoute} from './PrivateRoutes'
import { LoginScreen } from '../Componentes/Auth/LoginScreen';
import { CalendarScreen } from '../Componentes/calendar/CalendarScreen';
import { NothingHere } from '../Componentes/Error/NothingHere';


export const AppRouter = () => {
  const dispatch = useDispatch()
  const {cheking} = useSelector( state => state.authReducer )
  useEffect(() => {
    dispatch(startChecking())
    
  }, [dispatch]);
  
  if(cheking){
    return (<h1>Espere....</h1>)
  }

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } 
                />
          
          <Route path="/*"  element ={
                  <PrivateRoute>
                       <CalendarScreen/>
                  </PrivateRoute>
              }
          />
       

  
        <Route
            path="*"
            element={<NothingHere/>}
    />
        

    </Routes>
    </BrowserRouter>
  )
}

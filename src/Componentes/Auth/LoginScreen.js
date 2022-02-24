import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [formLoginvalues, handleLoginInputChange] = useForm({
    lEmail:'',
    lPasswd: ''
  })
  const [formRegistervalues, handleRegisterInputChange] = useForm({
    name:'',
    rEmail:'',
    rPasswd: '',
    rPasswd2: ''
  })

  const { lEmail, lPasswd} = formLoginvalues ;
  const handleLogin = (e)=>{
      e.preventDefault()
      dispatch(startLogin(lEmail, lPasswd))
  }
  const { name, rEmail, rPasswd, rPasswd2} = formRegistervalues ;
  const handleRegister = (e)=>{
    e.preventDefault()
    if(rPasswd !== rPasswd2){
      return Swal.fire('Error','Las contraseñas deben ser iguales', 'error')
    }

    dispatch(startRegister(name, rEmail, rPasswd))
    
}
  return (
    <div className='login__container'>
      <div className='container-title'>
      <h1 className='titleApp'><i className="fa-solid fa-book"></i> RememberNotes <i className="fa-solid fa-book"></i></h1>
      </div>
      
      <div className='flex-container'>
      <form onSubmit={handleLogin} className='login__login__container'>
      
      <div className='login__title__container'>
            <p>Ingresar </p>
      </div>
      <div className='login__container-inputsLogin'>
        <input className="login__inputs inputs-login"
         name='lEmail'
         value={lEmail} 
         onChange={handleLoginInputChange}
         placeholder="Email"
         type='email'/>
        <input className="login__inputs inputs-login"
          placeholder="Contraseña"
          name='lPasswd'
         value={lPasswd} 
         onChange={handleLoginInputChange}
          type='password'/>
      </div>
      <div className='login__containerbutton'>
        <button  type='submit' className='login__button-login button'>Ingresar <i className="fa-solid fa-arrow-right"></i></button>
      </div>
      </form>
      
    <form  onSubmit={handleRegister}  className='login__register__container'>
      <div className='register__title__container'>
          <p>Registrarse</p>
      </div>
      <div className='login__container-inputsRegister'>
         <input  
         className="login__inputs inputR"
           placeholder="Nombre"
           type='text'
           name='name'
           value={name}
           onChange={handleRegisterInputChange}/>
          <input  
          className="login__inputs inputR"
            placeholder="Email"
            type='email'
            name='rEmail'
            value={rEmail}
            onChange={handleRegisterInputChange}
            />
          <input  
          className="login__inputs inputR"
            placeholder="Contraseña"
            type='text'
            name='rPasswd'
            value={rPasswd}
            onChange={handleRegisterInputChange}
            />
          <input  
          className="login__inputs inputR"
            placeholder="Repita la contraseña"
            type='text'
            name='rPasswd2'
            value={rPasswd2}
            onChange={handleRegisterInputChange}

            />
     </div>    
      <div className='login__containerbutton'>
          <button type='submit'className='login__button-register button'>Registrarse <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
      </div>
      </form>
      </div>
</div>

   
 
 
 )
}


import React from 'react';

import { Provider } from 'react-redux';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom'

import { mount } from 'enzyme';

import { LoginScreen } from '../../../Componentes/Auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';




jest.mock('../../../actions/auth',()=>({
    startRegister: jest.fn(),
    startLogin: jest.fn()
}))

jest.mock('sweetalert2',()=>({
    fire: jest.fn()
}))


 
const middlewere = [thunk]

const mockStore = configureStore(middlewere)

const initState = {}

let store = mockStore(initState)
store.dispatch= jest.fn();

const wrapper = mount( 
    <Provider store={store} >
        <LoginScreen/>
    </Provider>
)





describe('test in <LoginScreen/>', () => {
    
    test('should be seen correctly', () => { 

        expect(wrapper).toMatchSnapshot()


     })

    test('should call the dispatch at loginScreen', () => { 

        wrapper.find('input[name="lEmail"]').simulate('change',{
            target:{
                name:'lEmail',
                value:'luciano@gmail.com'
            }
        })
        wrapper.find('input[name="lPasswd"]').simulate('change',{
            target:{
                name:'lPasswd',
                value:'1233456'
            }
        })

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })
        expect( startLogin).toHaveBeenCalledWith('luciano@gmail.com','1233456')

     })


     test('should not register if passwords are diferent', () => { 


        wrapper.find('input[name="rPasswd"]').simulate('change',{
            target:{
                name:'rPasswd',
                value:'1233456'
            }
        })
        wrapper.find('input[name="rPasswd2"]').simulate('change',{
            target:{
                name:'rPasswd2',
                value:'12333456'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect(startRegister).not.toHaveBeenCalled()
        expect(Swal.fire).toBeCalledWith('Error','Las contraseñas deben ser iguales', 'error')


     })
});

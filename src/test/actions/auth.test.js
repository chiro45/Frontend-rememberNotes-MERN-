import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import '@testing-library/jest-dom'
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";
import * as module from "../../helpers/fetch";
import { types } from "../../types/types";


jest.mock('sweetalert2',()=>({
    fire: jest.fn()
}))
 
const middlewere = [thunk]

const mockStore = configureStore(middlewere)

const initState = {}

let store = mockStore(initState)
Storage.prototype.setItem= jest.fn();

describe('Test to auth.js', () => {

    beforeEach(()=>{
        store= mockStore(initState)
        jest.clearAllMocks()
    })
        

    test('starLogin correct', async() => { 
        await store.dispatch(startLogin('luciano.chiroli45@gmail.com', '963852741'))

        const actions = store.getActions();

        
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))
        
        expect(actions[0]).toEqual(
            {
                type: '[auth] Login',
                payload: { uid: expect.any(String), name:expect.any(String) }
            }
        )
        //let token = localStorage.setItem.mock.calls[0][1]
        

     })
     test('starLogin incorrect', async() => { 
        await store.dispatch(startLogin('luciano.chirol2i45@gmail.com', '963852741'))
        let actions = store.getActions();
        expect(actions).toEqual([])

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Usuario o Contraseña incorrectos", "error")

     })


     test('starRegister correct', async() => { 
        module.fetchSinToken = jest.fn(()=>({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'juancarlo',
                    token: 'ABCDFG'

                }
            }
        }));
        await store.dispatch(startRegister('test@gmail.com', '963852741', 'test'))
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: '[auth] Login', payload: { uid: '123', name: 'juancarlo' } })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABCDFG')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

     })

     
     test('test on startcheking correct', async() => { 
        module.fetchConToken = jest.fn(()=>({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'juancarlo',
                    token: 'ABCDFG'

                }
            }
        }));
        
        await store.dispatch(startChecking())
        const actions = store.getActions();
        

        expect(actions[0]).toEqual({
           type: types.authlogin,
           payload: {
            uid: '123',
            name:'juancarlo'
           } 
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABCDFG')



      })


});

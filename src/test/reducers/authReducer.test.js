import { authReducer } from "../../Reducers/authReducer";
import { types } from "../../types/types";


describe('Test in the authReducer', () => {
    
    const initState= {
        checking: true
    }
    
    
    test('should of return state or default', () => { 

        const action = {}

        const state = authReducer(initState, action)

        expect(state).toEqual(initState)


     })

     test('should of authenticate the user', () => { 

        const action = {
            type: types.authlogin,
            payload: {
                uid: 123,
                name: 'luciano'
            }
        }

        const state = authReducer(initState, action)
        console.log(state)

        expect(state).toEqual({ checking: true, uid: 123, name: 'luciano', cheking: false })

        

      })




});

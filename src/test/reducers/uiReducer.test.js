import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../Reducers/uiReducer";



let initState = {
    modalOpen: false
}


describe('test in uiReducer', () => {
    test('should return state default', () => { 


        const state = uiReducer(initState,{})


        expect(state).toEqual(initState)

     })
     test('should of open and close the modal', () => { 

        const modalOpen = uiOpenModal()

        const state = uiReducer(initState, modalOpen)
       
        expect(state).toEqual({modalOpen: true})

        const uiClose = uiCloseModal();

        const state2 = uiReducer(state, uiClose)
       
        expect(state2).toEqual({modalOpen: false})

     })
     
});

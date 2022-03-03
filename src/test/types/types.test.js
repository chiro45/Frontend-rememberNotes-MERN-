import { types } from "../../types/types";



describe('Pruebas en Types.js', () => {
    test('los types deben de ser iguales', () => { 

        expect(types).toEqual({
            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
        
            eventStartAddNew: ['[event] Start Add New'],
            eventAddnew:'[event] Add new',
            eventSetActive:'[event] Set Active',
            eventClearActiveEvent: '[event] Clear Ative',
            eventUpdate:'[event] Event Updated',
            eventDelete: '[event] Event Delete',
            eventLoader: '[event] Event Loader',
            eventLogout: '[event] Logout event',
        
        
            authCheking: '[auth] Checking Login state',
            authChekingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start Login',
            authlogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start Token Renew',
            authLogout: '[auth] Logout'
        
        
        
        })


     })
});

import React from 'react';

import { Provider } from 'react-redux';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom'
import { DeleteFab } from '../../../Componentes/ui/DeleteFab';
import { mount } from 'enzyme';
import { startEventDelete } from '../../../actions/events';

jest.mock('../../../actions/events',()=>({
    startEventDelete: jest.fn()
}))
 
const middlewere = [thunk]

const mockStore = configureStore(middlewere)

const initState = {}

let store = mockStore(initState)
store.dispatch= jest.fn();

const wrapper = mount( 
    <Provider store={store} >
        <DeleteFab/>
    </Provider>
)



describe('test in <DeleteFab/>', () => {
    
    test('should to look correctly', () => { 

       
        expect(wrapper).toMatchSnapshot();
     })


     test('should call eventStartDelete when click the button', () => { 

        wrapper.find('button').prop('onClick')()

        expect(startEventDelete).toBeCalledWith()
     })




});

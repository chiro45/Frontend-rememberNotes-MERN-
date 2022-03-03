import React from 'react';

import { Provider } from 'react-redux';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom'

import { mount } from 'enzyme';
import { AppRouter } from '../../Router/AppRouter';

 
const middlewere = [thunk]

const mockStore = configureStore(middlewere)

const initState = {
    authReducer:{
        cheking: true
    }
}

let store = mockStore(initState)
//store.dispatch= jest.fn();







describe('Test in the <AppRouter/>', () => {
    test('should display the wait... component', () => { 

        const wrapper = mount( 
            <Provider store={store} >
                <AppRouter/>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').exists()).toBe(true)

    })

    test('should display the loginScreen, when the user is not authenticated', () => { 
        const initState = {
            authReducer:{
                cheking: false,
                uid: null
            }
        }
        let store = mockStore(initState)
        const wrapper = mount( 
            <Provider store={store} >
                <AppRouter/>
            </Provider>
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login__container').exists()).toBe(true);


    })

    test('should display the calendarScreen, when the user is authenticated', () => { 
        const initState = {
            authReducer:{
                cheking: false,
                uid: '123',
                name: 'JuanCarlo'

            },
            calendar:{
                events:[],

            },
            ui:{
                modalOpen: false
            }
        }
        let store = mockStore(initState)
        const wrapper = mount( 
            <Provider store={store} >
                <AppRouter/>
            </Provider>
        )
        
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);


    })
});

import React from 'react';

import { Provider } from 'react-redux';

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom'

import { mount } from 'enzyme';

import { CalendarScreen } from '../../../Componentes/calendar/CalendarScreen';

import {messages as messagesCalendar } from '../../../helpers/calendar-messages'
import { types } from '../../../types/types';
import { eventStartLoading, setActive } from '../../../actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/events',()=>({
    setActive: jest.fn(),
    eventStartLoading: jest.fn()
}))


Storage.prototype.setItem = jest.fn()
 
const middlewere = [thunk]

const mockStore = configureStore(middlewere)

const initState = {
    authReducer:{
            cheking:false,
            uid:"123",
            name:"Luciano",
    },
    calendar:{
        events:[],
        activeEvent: null
    },
    ui:{
        modalOpen: false
    }
}

let store = mockStore(initState)
store.dispatch= jest.fn();

const wrapper = mount( 
    <Provider store={store} >
        <CalendarScreen/>
    </Provider>
)





describe('Test in <CalendarScreen/>', () => {
    test('should be seen correctly', () => { 


        expect(wrapper).toMatchSnapshot()

     })


     test('test with the iteractions in calendar', () => {

        const calendar = wrapper.find('Calendar')
    
        const calendarMessagees = calendar.prop('messages')
        
        expect(calendarMessagees).toEqual(messagesCalendar)
        
        expect(calendar.exists()).toBe(true)

        calendar.prop('onDoubleClickEvent')()
        
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})

        calendar.prop('onSelectEvent')({start:'hola'})
        expect(setActive).toHaveBeenCalledWith({start: 'hola'})

        act(()=>{
            calendar.prop('onView')('week')
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')

        })


      })

});

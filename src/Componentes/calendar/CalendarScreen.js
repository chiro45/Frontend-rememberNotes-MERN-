import moment from 'moment'
import 'moment/locale/es'
import { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveNote, setActive } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';
import { messages } from '../../helpers/calendar-messages'
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteFab } from '../ui/DeleteFab';


import { NavBar } from '../ui/NavBar'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

const localizer = momentLocalizer(moment)
moment.locale('es');



export const CalendarScreen = () => {
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector(store => store.calendar)
  

  const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month');

  const onDoubleClick = (e)=> {
    dispatch(uiOpenModal())
  }
  
  const onSelectEvent = (e)=>{
    
    dispatch(setActive(e))
  }

  const onViewChange = (e)=>{
    setLastView(e)
      localStorage.setItem('lastView', e)
   
  }
  const onSelectSlot = (e)=>{
  dispatch(clearActiveNote())
  }


  const eventStyleGetter = (event, start, end, isSelected) =>{

    const style ={
      backgroundColor: '#369cf7',
      borderRadius: '.4rem',
      opacity: 0.8,
      display: 'block',
      color: 'white',
      
    }
    return {style}
    
    
  }
  

  
  return (
    <div className='calendar-screen'>
    
        <NavBar/>

        <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot={onSelectSlot}
      selectable={true}
      view={lastView}
      components={{
        event: CalendarEvent,
        
      }}
    />

    <CalendarModal/>
      <AddNewFab/> 
     
     {
          activeEvent &&
          <DeleteFab/>

     }
  </div>
    </div>
  )
}

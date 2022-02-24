
import moment from 'moment'


import { useEffect, useState } from 'react';


import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { addNew, clearActiveNote, eventUpdate } from '../../actions/events';
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const startDate = moment().minutes(0).seconds(0).add(1,'hour');
const endDate = startDate.add(1, 'hour')


const initEvent = {
  title: '',
  notes: '',
  start: startDate.toDate(),
  end:    endDate.toDate(),

}



export const CalendarModal = () => {
  const {modalOpen} = useSelector(state => state.ui)
  const { activeEvent} = useSelector(store => store.calendar)

  const dispatch = useDispatch()
  
    const [dateStart, setDateStart] = useState(startDate.toDate());

    const [endStart, setEndStart] = useState(endDate.toDate());

    const [formValues, setFormValues] = useState(initEvent);

    const {notes, title} = formValues;

     
    useEffect(()=>{
      if(activeEvent) {
      setFormValues(activeEvent)
    }else{
      setFormValues(initEvent)
      }
    },[activeEvent, setFormValues])


    const handleInputChange = ({target})=>{
       setFormValues({
        ...formValues,
        [target.name]: target.value
       })


    }
    const handleStartDateChange = (value)=>{
        
        setDateStart(value)
        setFormValues({
          ...formValues,
          start: value
        })
    }

    const handleEndDateChange = (value)=>{
        setEndStart(value)
        setFormValues({
          ...formValues,
          end: value
        })
    }
    const handleSubmitForm = (e)=>{
      e.preventDefault();
      
      const momentStart = moment( dateStart )
      const momentEnd = moment( endStart )
      
      if(momentStart.isSameOrAfter(momentEnd)){
        return Swal.fire("Error", 'La fecha final debe ser mayor', 'error')
      }
      else if(title.length < 2){
        return Swal.fire("Error", 'EL titulo debe tener mas de 2 caracteres', 'error')
        
      }else{
        if(activeEvent){
          dispatch(eventUpdate(formValues))
        }else{
          dispatch(addNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
              _id: '123',
              name:'Luciano'
            }
          }))
        }
      Swal.fire("Listo",'La nota ha sido guardada', 'success')
       closeModal();
      }

      
    }
    
    
      const closeModal= ()=> {
        dispatch(uiCloseModal())
        dispatch(clearActiveNote())
        setFormValues(initEvent)
      }

  return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
        contentLabel="Example Modal"
      >
        <h1 className='modal-title'>{(activeEvent) ? 'Editando' : 'Nuevo evento'} <i className="fa-solid fa-calendar-plus"></i></h1>
       
        <form className='form-Container' onSubmit={handleSubmitForm}>
        <label className='modal__label-input'>Fecha y hora de inicio <i className="fa-solid fa-clock"></i></label>

        <DateTimePicker  
        className='modal__input'
        onChange={handleStartDateChange} 
        value={dateStart} />

        <label className='modal__label-input'>Fecha y hora final  <i className="fa-solid fa-clock"></i></label>

        <DateTimePicker  
        className='modal__input'
        onChange={handleEndDateChange} 
        minDate={dateStart}
        value={endStart} />

        <label className='modal__label-input'>Titulo y nota <i className="fa-solid fa-pen"></i></label>

        <input className='modal__input1' 
        placeholder='Titulo del Evento' 
        type='text' name='title' 
        value={title}
        onChange={handleInputChange}
        />
        <small className="">Descripcion Corta </small>

        <textarea className='text-area'
        placeholder='Notas'
        name='notes'
        value={notes}
        onChange={handleInputChange}>
        </textarea>
        <small className="">Información adicional </small>
      
        <button type='submit' className='button-modal'>Guardar <i className="fa-solid fa-floppy-disk"></i></button>
        </form>
      </Modal>
   
  )
}

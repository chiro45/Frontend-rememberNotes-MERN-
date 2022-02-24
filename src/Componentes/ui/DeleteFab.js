
import { useDispatch } from 'react-redux'
import {  startEventDelete } from '../../actions/events';


export const DeleteFab = () => {
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(startEventDelete())
    }
  return (
    <button className='fabs delete' onClick={handleClick}><i className="fa-solid fa-trash-can"></i></button>
  )
}

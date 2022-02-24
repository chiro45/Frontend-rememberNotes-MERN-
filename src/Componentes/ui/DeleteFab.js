
import { useDispatch } from 'react-redux'
import { eventDelete } from '../../actions/events';


export const DeleteFab = () => {
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(eventDelete())
    }
  return (
    <button className='fabs delete' onClick={handleClick}><i className="fa-solid fa-trash-can"></i></button>
  )
}

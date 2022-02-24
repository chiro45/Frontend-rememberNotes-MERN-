
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(uiOpenModal())
    }
  return (
    <button className='fabs' onClick={handleClick}><i className='fas fa-plus'/></button>
  )
}

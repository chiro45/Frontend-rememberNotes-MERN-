import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../actions/auth"





export const NavBar = () => {


  const dispatch = useDispatch()

  const {name} =  useSelector(state => state.authReducer)
  const handleLogout= ()=>{
    dispatch(startLogout())
  }
  return (
    <div className="navbar__container">
        <div className="navbar__name-container">
            <span className="navbar-name">{name}  <i className="fa-solid fa-user-pen"></i></span>
        </div>


        <div className="navbar__logout-container">
            <button 
            className="navbar-logout"
            onClick={handleLogout}>Salir <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
        </div>




    </div>
  )
}

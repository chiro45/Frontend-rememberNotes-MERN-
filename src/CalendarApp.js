
import { Provider } from 'react-redux'
import { AppRouter } from './Router/AppRouter'
import { store } from './store/store'
import './Styles/styles.scss'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
          <AppRouter />
    </Provider>
  )
}

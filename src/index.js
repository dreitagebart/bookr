import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './styles/app.css'
import store from './reducers/store'
import App from './components/App'
import AboutPage from './pages/AboutPage'
import getUrlParams from './utils/getUrlParams'
import registerServiceWorker from './registerServiceWorker'

const getParams = getUrlParams()

let RootComponent = App

if (getParams.startPage) {
  switch (getParams.startPage) {
    case 'about': {
      RootComponent = AboutPage
      break
    }
    default:
      RootComponent = App
      break
  }
}

ReactDOM.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

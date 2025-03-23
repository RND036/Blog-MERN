import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './redux/store.js' //importing redux store
import {Provider} from 'react-redux' //importing provider for store

createRoot(document.getElementById('root')).render(
  //wrapping the app with provider to provide the store to all the components all over the application
  <Provider store={store}>
    <App />
  </Provider>,
)

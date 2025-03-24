import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './redux/store.js' //importing redux store
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux' //importing provider for store
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  {/*wrapping the app with provider to provide the store to all the components all over the application*/}
  <Provider store={store}>
    <ThemeProvider>

    <App />
    </ThemeProvider>
  </Provider>,
  </PersistGate>
)

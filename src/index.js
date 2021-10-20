import React from 'react'
import ReactDOM from 'react-dom'
import 'modern-normalize/modern-normalize.css'
import './styles/globals.css'
import App from './App'
import AppContextProvider from './context/AppContext'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

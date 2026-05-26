import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Clarity from '@microsoft/clarity'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

Clarity.init('wx0osaogjt')
ReactGA.initialize('G-CKH3ZJXHSD')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

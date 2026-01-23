import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //there was strict tag rapping around App component but its not inportant and we do not need that
    <App />

)

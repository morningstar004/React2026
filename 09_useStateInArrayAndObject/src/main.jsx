import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './component/neatedForm.jsx'
import TaskApp from './component/UseStateOnArray.jsx'

createRoot(document.getElementById('root')).render(
    // <TaskApp />,
    // <App/>,
    <Form/>
)

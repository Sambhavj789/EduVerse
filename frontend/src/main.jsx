import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import { UserContext } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Toaster position='top-right' />
    <UserContext>
      <App />
    </UserContext>
  </>,
)

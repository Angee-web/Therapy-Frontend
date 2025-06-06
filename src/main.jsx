import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from "@/components/ui/toaster"
import { SocketProvider } from './store/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* the provider is from reacr-redux */}
  <Provider store={store}>
  <StrictMode>
    <SocketProvider>
    <App />
    <Toaster />
    </SocketProvider>  
  </StrictMode>
  </Provider>
  </BrowserRouter>,
)

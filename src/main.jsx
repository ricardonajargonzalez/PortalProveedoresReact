import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { App } from './App'
import { store } from './store'
import './styles.css'
import { CartProvider } from './portal/views/Cartcontext'
import { CarritoProvider } from './portal/views/Carritocontexto'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
    <CartProvider>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
    </CartProvider>
    </CarritoProvider>
  </React.StrictMode>,
)

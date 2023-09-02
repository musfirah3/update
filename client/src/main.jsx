import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from './Users/context/CartContext/context.jsx';
import ContextProvider from './Context/context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <ContextProvider>
      <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartContextProvider>
    </ContextProvider>
  </React.StrictMode>




  ,
)

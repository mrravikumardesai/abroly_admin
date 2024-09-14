import axios from 'axios';
import React from 'react'
import { ErrorToast } from './utils/Toaster';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import Index from './routes/Index';

const App = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 402) {
        ErrorToast("Please Purchase Subscription!");
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
      if (error.response.status === 401) {
        ErrorToast("Auth Failed!");
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }

      return error;
    })
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Index />
        <Toaster />
      </BrowserRouter>
      </Provider>
  )
}

export default App
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



const reducer = (state, action) => {

  if (action.type === 'SET_STATE') {
    return { ...state, name: action.payload, cities: action.secondPayload }
  }

  return state
}
const initalState = {
  name: '',
  cities: [],
}
const store = createStore(reducer, initalState)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>

  </Provider>

);


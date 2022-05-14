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
import LoginPage from './Auth/LoginPage';



const reducer = (state, action) => {

  if (action.type === 'SET_CITIES') {
    return { ...state, cities: action.payload }
  }

  if (action.type === 'SET_NAME') {
    return { ...state, name: action.payload }
  }
  if (action.type === 'SET_USER') {
    return { ...state, currentUser: action.payload }
  }

  return state
}
const initalState = {
  name: '',
  userUID: '',
  currentUser: {
    name: 'test',
    email: 'tesst',
    cities: ['test']

  },
}
const store = createStore(reducer, initalState)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<App />} />

        </Routes>
      </React.StrictMode>
    </BrowserRouter>

  </Provider>

);

